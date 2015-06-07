# README #

`/kohana/modules/RT/init.php` needs updating:

    redirect_url = 'needs to be naked domain to main app'
    bucket = 'needs to be CNAMEd to S3 bucket'


Also, mongo `oauth_clients` entry needs to be updated/created with the `redirect_url`