FROM php:7.2-apache

MAINTAINER Amith Raravi <amith.raravi@gmail.com>

COPY _site/ /var/www/html/
COPY config.php /var/www/
COPY .htaccess /var/www/
COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf

RUN chown -R www-data:www-data /var/www/html
RUN a2enmod rewrite
