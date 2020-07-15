const ldap = require('ldapjs');
const ldap2date = require('ldap2date');
let cfg = require('../config/ldap')
const jwt = require("jsonwebtoken");

module.exports.login_ldap = (req, res, next) => { 
    let username = req.body.username;
    let dn = 'uid=' + username + ',' + cfg.ldap.users;
    console.log(dn);
    let password = req.body.password;

    let ldapclient = ldap.createClient({ url: cfg.ldap.url });
    ldapclient.bind(dn, password, function (err) {
        if (err) {
            res.send(err);
        } else {
            let opts = {};
            ldapclient.search(dn, opts, function (err, ldapres) {
                ldapres.on('searchEntry', function (entry) {
                     //console.log('entry: ' + JSON.stringify(entry.object));
                    let obj = entry.object;
                    let isAdmin = false;
                    let isGuest = false;
                    // filtring groups
                    let group_members = [];
                    if (obj.memberOf.constructor === Array)
                        group_members = obj.memberOf
                    else
                        group_members.push(obj.memberOf);
                    let groups = group_members.filter(function (arrayElement) {
                        return arrayElement.indexOf(cfg.ldap.base) == arrayElement.length - cfg.ldap.base.length;
                    });
                    // removing useless strings
                    for (let i = 0; i < groups.length; i++) {
                        groups[i] = groups[i].replace(',' + cfg.ldap.groups, '');
                        groups[i] = groups[i].replace("cn=", '');
                        if (groups[i] === cfg.ldap.admin_group) isAdmin = true;
                        if (groups[i] === cfg.ldap.chief_group) isGuest = true;
                    }
                    if (obj.krbLastSuccessfulAuth)
                        obj.krbLastSuccessfulAuth = ldap2date.parse(obj.krbLastSuccessfulAuth)

                    if (obj.krbLastFailedAuth)
                        obj.krbLastFailedAuth = ldap2date.parse(obj.krbLastFailedAuth)
                    // creating profile
                    let profile = {
                        dn: obj.dn,
                        ipaUniqueID: obj.ipaUniqueID,
                        krbPrincipalName: obj.krbPrincipalName,
                        uid: obj.uid,
                        displayName: obj.displayName,
                        mobile: obj.mobile,
                        mail: obj.mail,
                        uidNumber: obj.uidNumber,
                        gidNumber: obj.gidNumber,
                        groups: groups,
                        loginShell: obj.loginShell,
                        homeDirectory: obj.homeDirectory,
                        krbPasswordExpiration: ldap2date.parse(obj.krbPasswordExpiration),
                        krbLastPwdChange: ldap2date.parse(obj.krbLastPwdChange),
                        krbExtraData: obj.krbExtraData,
                        krbLastSuccessfulAuth: obj.krbLastSuccessfulAuth,
                        krbLastFailedAuth: obj.krbLastFailedAuth,
                        krbLoginFailedCount: obj.krbLoginFailedCount,
                        isAdmin: isAdmin,
                        isGuest: isGuest
                    };
                    res.send({
                        id_token: jwt.sign(profile, cfg.jwt.secret, { expiresIn: "1 day" })
                    });
                });
                ldapres.on('searchReference', function (referral) {
                    console.log('referral: ' + referral.uris.join());
                    ldapclient.unbind();
                    res.send(referral.uris.join());
                });
                ldapres.on('error', function (err) {
                    console.error('error: ' + err.message);
                    ldapclient.unbind();
                    res.send(err);
                });
                ldapres.on('end', function (result) {
                    console.log('ldap: User "' + username + '" login with status ' + result.status);
                    ldapclient.unbind();
                });
            });
        }
    });
}