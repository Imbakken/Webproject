async function updateUser(firstName, middleName, surName, emailAdress, fieldOfEducation, degree, school, password){
      var data = JSON.stringify({   "filter": {"firstname": firstName},
                                               "middlename": middleName,
                                               "surname": surName,
                                               "email address": emailAdress,
                                               "field of education": fieldOfEducation,
                                               "degree": degree,
                                               "school": school,
                                               "password": password
                                          });

      let dataRecieved=""
      await fetch(APIurl, {
            method: "PUT", 
            headers: {"Content-Type": "application/json"},
            body: data
      })
      .then(resp => {
            if (resp.status === 200){
                  return resp.json();      
            } else{
                  console.log("Status" + resp.status);
                  return Promise.reject("server");
            }
      })
      .then(dataJson => {
            dataRecieved = dataJson;
      })
      .catch(err => {
            if (err === "server") return
            console.log(err);
      });

      return dataRecieved;

}      

async function deleteUser(firstName){
      var data
}
