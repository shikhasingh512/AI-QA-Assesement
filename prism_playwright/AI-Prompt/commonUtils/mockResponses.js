const mockResponses =[
{
  "success": false, 
  "code": 500,
  "message": "Something Went wrong"
},

{
  "success": false, 
  "code": 400,
  "message": "Bad request!! Please send a valid token."
},

{
  "success": false, 
  "code": 302,
  "message": "Bad request!! there has been a change in the request "
},

]
module.exports = { mockResponses };