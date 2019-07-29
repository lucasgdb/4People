FROM php:7.3.7-apache
RUN \
	docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd \
	&& docker-php-ext-install pdo_mysql