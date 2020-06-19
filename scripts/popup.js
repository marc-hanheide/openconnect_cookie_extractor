function escapeForPre(e) {
  return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

function getDomain(e) {
  if (server = e.match(/:\/\/(.[^/:#?]+)/)[1], parts = server.split("."), isip = !isNaN(parseInt(server.replace(".", ""), 10)), parts.length <= 1 || isip) domain = server;
  else {
    var o = new Array;
    for (o[0] = parts[parts.length - 1], i = 1; i < parts.length; i++)
      if (o[i] = parts[parts.length - i - 1] + "." + o[i - 1], !domainlist.hasOwnProperty(o[i])) {
        domain = o[i];
        break
      }
      "undefined" == typeof domain && (domain = server)
  }
  return domain
}

function url_domain(data) {
  var    a      = document.createElement('a');
         a.href = data;
  return a.hostname;
}

var content = "",
  downloadable = "",
  popup = "",
  jsons = [];

var copyTextareaBtn = document.querySelector('.js-textareacopybtn');
var copyTextarea = document.querySelector('.js-copytextarea');
var div_available = document.querySelector('#available');
var div_unavailable = document.querySelector('#unavailable');
var div_message = document.querySelector('#message');

chrome.tabs.getSelected(null, function(e) {
  domain = url_domain(e.url);
  chrome.cookies.getAll({}, function(o) {
    for (var t in o) {
      cookie = o[t];

      if (-1 != cookie.domain.indexOf(domain)) {
        if (cookie.name == 'webvpn') {
          content += 
            "sudo openconnect --cookie="
            + escapeForPre(cookie.value) 
            + " " 
            + escapeForPre(cookie.domain);
            div_unavailable.style.display = "none";
            div_available.style.display = "block";
          break;
        }
      };
    }
    copyTextarea.cols = content.length;
    copyTextarea.value = content;
    //变成可以看的json string
    //content += JSON.stringify(jsons, null, 2);

    //下载链接
    //var downloadLinkContent = "data:application/octet-stream;base64," + btoa(content);
    //var downloadLink = "<a href=" + downloadLinkContent + ' download="cookies.json">download as json file</a>';

    //document.write(content);
    
  });
});



copyTextarea.addEventListener('click', function(event) {
  copyTextarea.focus();
  copyTextarea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});