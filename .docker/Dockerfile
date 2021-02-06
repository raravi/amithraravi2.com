FROM php:5.6-apache

LABEL maintainer="Amith Raravi <amith.raravi@gmail.com>"

COPY _site/ /var/www/html/
COPY config.php /var/www/
COPY .htaccess-no-ssl /var/www/.htaccess
COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf

RUN chown -R www-data:www-data /var/www/html
RUN a2enmod rewrite
RUN a2enmod headers

RUN printf '[PHP]\ndate.timezone = "Europe/Berlin"\n' > /usr/local/etc/php/conf.d/tzone.ini
