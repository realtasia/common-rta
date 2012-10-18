<?php defined('SYSPATH') or die('No direct script access.');

/**
 * RTA Daemon. Original copy acquired from https://github.com/jonnyjon/Task-Queue/blob/master/classes/controller/daemon.php
 *
 * @author jonnyjon
 * @package realtasia-beta-0.8
 * @subpackage Controller
 * @copyright unknown
 */

class Controller_Daemon extends Controller
{

    public function before()
    {
        die(phpinfo());
        parent::before();

// Setup
        ini_set("max_execution_time", "0");
        ini_set("max_input_time", "0");
        set_time_limit(0);

// Signal handler
        pcntl_signal(SIGCHLD, array($this, 'sig_handler'));
        pcntl_signal(SIGTERM, array($this, 'sig_handler'));
        declare(ticks = 1);

// library
        //include_once APPPATH . '/classes/library/task_queue.php';
    }

    protected $_config;
    protected $_sigterm;
    protected $_pids = array();

    /*
     * Forks into background and initializes daemon
     */
    public function action_index($config = 'default')
    {

// fork into background
        $pid = pcntl_fork();

        if ($pid == -1)
        {
// Error - fork failed
            Kohana::$log->add('error', 'Queue. Initial fork failed');
            exit;
        }
        elseif ($pid)
        {
// Fork successful - exit parent (daemon continues in child)
            Kohana::$log->add('debug', 'Queue. Daemon created succesfully at: ' . $pid);
            exit;
        }
        else
        {
// Background process - run daemon
            $this->_config = Kohana::$config->load('daemon')->$config;

            Kohana::$log->add('debug', strtr('Queue. Config :config loaded, max: :max, sleep: :sleep', array(
                     ':config' => $config,
                     ':max' => $this->_config['max'],
                     ':sleep' => $this->_config['sleep']
                  )));

// Write the log to ensure no memory issues
            Kohana::$log->write();

// run daemon
            $this->daemon();
        }
    }

    /*
     * This is the actual daemon process that reads queued items and executes them
     */
    protected function daemon()
    {
        try
        {
            while (!$this->_sigterm)
            {
                // Find first task that is not being executed
                $job = Model::factory('job')->collection->findOne(array('_id' => new MongoID('4f16d263f68e597005000003')));

                if (($job) && count($this->_pids) < $this->_config['max'])
                {
                    // Task found
                    // Write log to prevent memory issues
                    Kohana::$log->write();

                    $pro = new Job_Processor_Immediate($job);
                    $mail_adder = $pro->add();

                    $mailer = Email::mailer();

                    foreach($mail_adder::$emails as $mail)
                    {
                        // Fork process to execute task
                        $pid = pcntl_fork();

                        if ($pid == -1)
                        {
                            Kohana::$log->add('error', 'Queue. Could not spawn child task process.');
                            exit;
                        }
                        elseif ($pid)
                        {
                            // Parent - add the child's PID to the running list
                            $this->_pids[$pid] = time();
                        }
                        else
                        {
                            try
                            {
                                print_r($mailer->send($mail));
                            }
                            catch (Exception $e)
                            {
                                Debug::log('Could not send email');
                            }
                            // update task

                            exit;
                        }
                    }
                }
                else
                {
                    // No task in queue - sleep
                    usleep($this->_config['sleep']);
                }
            }
        }
        catch (Exception $e)
        {
            Kohana::$log->add('error', 'Queue. Daemon failed, msg: ' . $e->getMessage());
        }
    }

    /*
     * Performs clean up. Tries (several times if neccesary)
     * to kill all children
     */
    protected function clean()
    {
        $tries = 0;

        while ($tries++ < 5 && count($this->_pids))
        {
            $this->kill_all();
            sleep(1);
        }

        if (count($this->_pids))
        {
            Kohana::$log('error', 'Queue. Could not kill all children');
        }
    }

    /*
     * Tries to kill all running children
     */
    protected function kill_all()
    {
        foreach ($this->_pids as $pid => $time)
        {
            posix_kill($pid, SIGTERM);
            usleep(500);
        }

        return count($this->_pids) === 0;
    }

    /*
     * Signal handler. Handles kill & child died signal
     */
    public function sig_handler($signo)
    {
        switch ($signo)
        {
            case SIGCHLD:
// Child died signal
                while (($pid = pcntl_wait($status, WNOHANG || WUNTRACED)) > 0)
                {
// remove pid from list
                    unset($this->_pids[$pid]);
                }
                break;
            case SIGTERM:
// Kill signal
                $this->_sigterm = TRUE;
                Kohana::$log->add('debug', 'Queue. Hit a SIGTERM');
                break;
        }
    }

}