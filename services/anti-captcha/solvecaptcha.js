
// http module should be installed:
// npm i http

// Params:
// your anti-captcha.com account key
var anticaptcha = require('./anticaptcha')('7dcfaab894dca7c2f45971cc0cd2f7a1');

//recaptcha key from target website
anticaptcha.setWebsiteURL("https://id.sonyentertainmentnetwork.com/signin/?service_entity=urn:service-entity:psn&response_type=code&client_id=ba495a24-818c-472b-b12d-ff231c1b5745&redirect_uri=https://remoteplay.dl.playstation.net/remoteplay/redirect&scope=psn:clientapp&request_locale=en_US&ui=pr&service_logo=ps&layout_type=popup&smcid=remoteplay&PlatformPrivacyWs1=minimal&error=login_required&error_code=4165&error_description=User+is+not+authenticated&no_captcha=false#/signin?entry=%2Fsignin");
anticaptcha.setWebsiteKey("6Le-UyUUAAAAAIqgW-LsIp5Rn95m_0V0kt_q0Dl5");

//proxy access parameters
anticaptcha.setProxyType("http");
anticaptcha.setProxyAddress("213.166.95.5");
anticaptcha.setProxyPort(1598);
anticaptcha.setProxyLogin("user31573");
anticaptcha.setProxyPassword("1rpqen");

//browser header parameters
anticaptcha.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116");

anticaptcha.setCookies("anticaptcha=cool; cookies=set");

// check balance first
function startAntiCaptcha () {
    return  new Promise(function (resolve, reject) {
        anticaptcha.getBalance(function (err, balance) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            if (balance > 0) {
                anticaptcha.createTask(function (err, taskId) {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return;
                    }

                    console.log(taskId);

                    anticaptcha.getTaskSolution(taskId, function (err, taskSolution) {
                        if (err) {
                            console.error(err);
                            reject(err);
                            return;
                        }

                        resolve(taskSolution);
                        console.log(taskSolution);
                    });
                });
            }
        });
    });
}

module.exports = startAntiCaptcha;