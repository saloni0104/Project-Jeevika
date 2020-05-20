
//----------------------------------------------------------------------------------------------------------------------------

  // ACCEPT DONATIONS JS


  function sendMessage(event) {
    event.preventDefault()
    let id = event.target.getAttribute('data-id');
    console.log(id)
  
    var message = document.getElementById("Textarea1").value;


    let status = [];


    if (message.length <= 1) {
      document.getElementById("Textarea1").style.borderColor = "red";
      document.getElementById("Textarea1").value = "";
      document.getElementById("Textarea1").placeholder = "Please enter valid message";
      status.push("false")
      document.getElementById("Textarea1").classList.add("red");
    } else {
      status.push("true")
    }
    if (status.includes("false")) {
      console.log("There was some error while validating")
      return false
    }
    else {
      console.log("Validated")
      document.getElementById("submitmessage").value = "Loading..."
      let token = (localStorage.getItem("token"));
      fetch("https://crack-corona-hack-backend.herokuapp.com/app/accept_donation/", {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }),
        body: JSON.stringify({
          donation_id: id,
          message: message
        }),
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          console.log(res);
          if (res.message === "Donation accepted") {
            document.getElementById("banner").style.backgroundColor = "green";
            document.getElementById("banner").style.display = "block";
            document.getElementById("banner").innerHTML = "You have successfully accepted the donation";
            document.getElementById("banner").classList.add("error");
            document.getElementsByClassName("accepted").value = "Accepted";

            setTimeout(() => {
              window.location.href = "ngo.html";

            }, 2500)
          } else {
            document.getElementById("banner").style.backgroundColor = "red";
            document.getElementById("banner").style.display = "block";
            document.getElementById("banner").innerHTML = "Unexpected error occurred"
            document.getElementById("banner").classList.add("error");
            document.getElementById("prsub").value = "Submit"
          }
        })
        .catch(err => {
          document.getElementById("banner").style.backgroundColor = "red";
          document.getElementById("banner").style.display = "block";
          document.getElementById("banner").innerHTML = "It's on us! There was some error"
          document.getElementById("banner").classList.add("error");
          document.getElementById("prsub").value = "Submit"


        })
    }

  }
    

window.onload = function () {

  //VIEW DONATIONS JS

  let token = localStorage.getItem("token");
  fetch("https://crack-corona-hack-backend.herokuapp.com/app/all_donations/", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
    .then(res => {
      return res.json()
    })
    .then(res => {

      if (res.message === "Donations Found") {
        console.log('thsi is data')
        console.log(res);
        let content = "";
        let serial = 0;
  
        res.Donations.forEach(ele => {
          let username = ele.username;
          let itemname = ele.item_name;
          let quantity = ele.quantity;
          let location = ele.location;
          let description = ele.description;
          serial = serial + 1;
          content = content + `<div class="card" style="width:50%" id="viewdonationcards">
          <h5 class="card-header" style="background-color: gainsboro;">${username}</h5>
          <div class="card-body">
              <p class="card-text">
              <div>${itemname}</div>
              <div>${quantity}</div>
              <div>${location}</div>
              <div>${description}</div>
              </p>
              <div class="dropdown">
                  <button class="btn btn-warning my-2 my-sm-0 dropdown-toggle accepted"
                      id="dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false">Accept Donation</button>
                  <div class="dropdown-menu" style="padding-top: 3px; height: 4px;"
                      aria-labelledby="dropdownMenuButton">
                      <form>
                          <div class="form-group">
                              <textarea class="form-control" id="Textarea1" rows="5" cols="50"
                                  placeholder="Drop a message"></textarea>
                              <button data-id='${ele.id}' onclick="sendMessage(event)" class="btn btn-outline-warning" type="submit"
                                  id="submitmessage">Submit</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>`
        })
        document.getElementById('viewdonationcards').innerHTML = content;

      }
    })
    .catch(err => {
      console.log(err);
    })

  //--------------------------------------------------------------------------------------------------------------------------

  //LOGOUT JS      @Done


  document.getElementById("logout").addEventListener("click", function (e) {
    e.preventDefault()
    let token = localStorage.getItem("token");
    fetch("https://crack-corona-hack-backend.herokuapp.com/app/org/logout", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.message === "Organization logged out") {
          document.getElementById("banner").style.backgroundColor = "green";
          document.getElementById("banner").style.display = "block";
          document.getElementById("banner").innerHTML = "You have successfully logged out!";
          document.getElementById("banner").classList.add("error");
          setTimeout(() => {
            window.location.href = "index.html";
          }, 2500)
        } else {
          document.getElementById("banner").style.backgroundColor = "red";
          document.getElementById("banner").style.display = "block";
          document.getElementById("banner").innerHTML = "You have already logged out"
          document.getElementById("banner").classList.add("error");
        }
      })
      .catch(err => {
        console.log(err)
        document.getElementById("banner").style.backgroundColor = "red";
        document.getElementById("banner").style.display = "block";
        document.getElementById("banner").innerHTML = "It's on us! There was some error"
        document.getElementById("banner").classList.add("error");
      })
  });

  //------------------------------------------------------------------------------------------------------------------------------------------------------

  //VIEW PROFILE JS  @Done

  document.getElementById("profile").addEventListener("click", function (e) {
    e.preventDefault()
    let token = localStorage.getItem("token");
    fetch("https://crack-corona-hack-backend.herokuapp.com/app/org/details/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        console.log(res);
        if (res.message === "Organization details") {
          document.getElementById("pr_nameoforg").innerHTML = res.Organization.org_name;
          document.getElementById("pr_location").innerHTML = res.Organization.address;
          document.getElementById("pr_link").innerHTML = res.Organization.web_link;
          document.getElementById("pr_desc").innerHTML = res.Organization.description;
          document.getElementById("pr_email").innerHTML = res.Organization.email;
          document.getElementById("pr_phone").innerHTML = res.Organization.phone_no;
          document.getElementById("pr_area").innerHTML = res.Organization.areas_catered;
        } else {

        }
      })
      .catch(err => {
        console.log(err);
      })
  })

  //------------------------------------------------------------------------------------------------------------------------------------------------------


  //ADD HELP PROGRAMME JS   @Done

  document.getElementById("prsub").addEventListener("click", function (e) {
    e.preventDefault()

    var progname = document.getElementById("progname").value;
    var progdesc = document.getElementById("progdesc").value;
    var progaid = document.getElementById("progaid").value;
    var progcity = document.getElementById("progcity").value;
    var progaddr = document.getElementById("progaddr").value;


    let status = [];


    if (progname.length <= 1) {
      document.getElementById("progname").style.borderColor = "red";
      document.getElementById("progname").value = "";
      document.getElementById("progname").placeholder = "Please enter valid name";
      status.push("false")
      document.getElementById("progname").classList.add("red");
    } else {
      status.push("true")
    }
    if (progdesc.length < 1) {
      document.getElementById("progdesc").style.borderColor = "red";
      document.getElementById("progdesc").value = "";
      document.getElementById("progdesc").placeholder = "Please enter valid description";
      status.push("false")
      document.getElementById("progdesc").classList.add("red");
    } else {
      status.push("true")
    }
    if (progaid.length <= 1) {
      document.getElementById("progaid").style.borderColor = "red";
      document.getElementById("progaid").value = "";
      document.getElementById("progaid").placeholder = "Please enter valid Aid";
      status.push("false")
      document.getElementById("progaid").classList.add("red");
    } else {
      status.push("true")
    }
    if (progcity.length <= 1) {
      document.getElementById("progcity").style.borderColor = "red";
      document.getElementById("progcity").value = "";
      document.getElementById("progcity").placeholder = "Please enter valid city";
      status.push("false")
      document.getElementById("progcity").classList.add("red");
    } else {
      status.push("true")
    }
    if (progaddr.length <= 1) {
      document.getElementById("progaddr").style.borderColor = "red";
      document.getElementById("progaddr").value = "";
      document.getElementById("progaddr").placeholder = "Please enter valid address";
      status.push("false")
      document.getElementById("progaddr").classList.add("red");
    } else {
      status.push("true")
    }
    if (status.includes("false")) {
      console.log("There was some error while validating")
      return false
    }
    else {
      console.log("Validated")
      document.getElementById("prsub").value = "Loading..."
      let token = (localStorage.getItem("token"));
      fetch("https://crack-corona-hack-backend.herokuapp.com/app/help_prg/", {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }),
        body: JSON.stringify({
          prg_name: progname,
          description: progdesc,
          aid_provided: progaid,
          city: progcity,
          address: progaddr
        }),
      })
        .then(res => {
          return res.json();
          console.log(res);
        })
        .then(res => {
          console.log(res);
          if (res.message.id) {
            document.getElementById("banner").style.backgroundColor = "green";
            document.getElementById("banner").style.display = "block";
            document.getElementById("banner").innerHTML = "You help programme has been successfully added!!";
            document.getElementById("banner").classList.add("error");
            document.getElementById("prsub").value = "Submit";
            setTimeout(() => {
              window.location.href = "ngo.html";
            }, 2500)
          } else if (res.err == "User already exist") {
            document.getElementById("banner").style.backgroundColor = "red";
            document.getElementById("banner").style.display = "block";
            document.getElementById("banner").innerHTML = "User already exist!! Try signing in."
            document.getElementById("banner").classList.add("error");
            document.getElementById("prsub").value = "Submit"
          } else {
            document.getElementById("banner").style.backgroundColor = "red";
            document.getElementById("banner").style.display = "block";
            document.getElementById("banner").innerHTML = "Unexpected error occurred"
            document.getElementById("banner").classList.add("error");
            document.getElementById("prsub").value = "Submit"
          }
        })
        .catch(err => {
          document.getElementById("banner").style.backgroundColor = "red";
          document.getElementById("banner").style.display = "block";
          document.getElementById("banner").innerHTML = "It's on us! There was some error"
          document.getElementById("banner").classList.add("error");
          document.getElementById("prsub").value = "Submit"
        })
    }
  });



  // -----------------------------------------------------------------------------------------------------------------------

  // VIEW HELP PROGRAMS JS

  document.getElementById("ngo_help_programs").addEventListener("click", function (e) {
    e.preventDefault()
    fetch("https://crack-corona-hack-backend.herokuapp.com/app/all_help_prg/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return res.json()
      })
      .then(res => {

        if (res.message === "Help Programs Found") {
          console.log(res);
          let content = "";
          let serial = 0;
          res.HelpPrograms.forEach(ele => {
            let prgname = ele.prg_name;
            let orgname = ele.org_name;
            let aidprovided = ele.aid_provided;
            let city = ele.city;
            let address = ele.address;
            let description = ele.description;
            serial = serial + 1;
            content = content + `
            <div class="card " style="width:200%; " id="viewhelpprograms">
            <div class="card-body">
                <h5 class="card-title" style="color:#f77f00; font-weight:bolder">${prgname}</h5>
                <p class="card-text">
                <div style="font-size: 18px; font-weight: bolder; padding-bottom: 10px;" id="quanofitem">${aidprovided}</div>
                <div style="font-size: 18px; font-weight: bolder; padding-bottom: 10px;" id="quanofitem">${description}</div>
                <div style="font-size: 18px; font-weight: bolder; padding-bottom: 10px;" id="quanofitem">${city}</div>
                <div style="font-size: 18px; font-weight: bolder; padding-bottom: 10px;" id="quanofitem">${address}</div>
                </p>
            </div>
            <div class="card-body" style="background-color:grey; color:white" >
                <a href="#" class="card-link"  >${orgname}</a>
            </div>
        </div>
        `
          })

          document.getElementById('viewhelpprogrammes').innerHTML = content;

        } else {

        }
      })
      .catch(err => {
        console.log(err);
      })


  })

  
}