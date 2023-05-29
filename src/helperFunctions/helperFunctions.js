export default function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
  }
  else
  {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
      end = dc.length;
      }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
}

export function setcookie(cookieName, cookieValue) {

  console.log('setcookie called')
  let today = new Date();
  let expire = new Date();
  expire.setTime(today.getTime() + 3600000*24*14);
  document.cookie = cookieName+"="+encodeURI(cookieValue) + ";expires="+expire.toGMTString();
}


