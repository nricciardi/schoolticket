function GetAction(data)
{
  // istanza dell'oggetto XMLHttpRequest
  if (window.XMLHttpRequest)
  {
    req = new XMLHttpRequest();
    req.onreadystatechange = ProcessRequest;
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    req.send(data);
  }
  // controllo sulla versione ActiveX
  else if (window.ActiveXObject)
  {
    req = new ActiveXObject('Microsoft.XMLHTTP')
    if (req)
    {
      req.onreadystatechange = ProcessRequest;
      req.open('POST', url, true);
      req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      req.send(data);
    }
  }
}

function ProcessRequest()
{
  // stato della ricerca inviata
  if (req.readyState == 4)
  {
    // stato della ricerca accolta
    if (req.status == 200)
    {
      eval(what);
    }else{
      alert('Problema nella gestione dei dati: ' + req.responseText);
    }
  }
}
