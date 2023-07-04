function convertSheetDataToJson() {
  // Get the active sheet
  var sheet = SpreadsheetApp.getActiveSheet();

  // Get the data range
  var range = sheet.getDataRange();

  // Get the values from the range
  var values = range.getValues();

  // Create an array to store the data
  var data = [];


  // Loop through the rows and columns of the data
  for (var i = 2; i < values.length; i++) {
    if (values[i][7] != "" && values[i][8] != "" && values[i][9] != ""){
      var row = {};
      for (var j = 0; j < values[i].length; j++) {
        row[values[1][j]] = values[i][j];
      }
      data.push(row);
    }
  }

  // Convert the data to JSON
  var json = JSON.stringify({ items: data});
  console.log(json)

  // Making a post request to the dynamodb table
  var options = {
    'method' : 'post',
    'payload' : json,
    'contentType': 'application/json',
    "headers" : {
       "Authorization" : PropertiesService.getScriptProperties().getProperty('pwa_auth')
,
     }
  };
  var response = UrlFetchApp.fetch('https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items', options);
  console.log(response);
}

