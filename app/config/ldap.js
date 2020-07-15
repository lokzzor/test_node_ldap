var conf={};
conf.ldap = {};
conf.cors = {};
conf.jwt = {};
conf.secure = {};

conf.ldap.url = 'ldap://bmn-ipa.jinr.ru:389';
conf.ldap.realm = 'JINR.RU';
conf.ldap.base = 'cn=accounts,dc=jinr,dc=ru';
conf.ldap.users = 'cn=users,'+ conf.ldap.base;
conf.ldap.groups = 'cn=groups,' + conf.ldap.base;
conf.ldap.admin_group = 'bmnunidbwriter';
conf.ldap.guest_group = 'bmnunidbreader';
conf.cors.allowed = ['*'];
conf.jwt.secret = "secretcode";

module.exports = conf;