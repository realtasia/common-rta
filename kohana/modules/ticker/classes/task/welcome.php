<?php

class Task_Welcome extends Minion_Task {

    protected function _execute(array $params) {
        while(1)
        {
            Minion_CLI::write('hello world!');
            sleep(1);
        }
    }

}
