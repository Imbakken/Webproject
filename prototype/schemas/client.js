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

      let dataRecieved

}      
