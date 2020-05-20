window.onload = function () {

  //WELCOME USER    @Done
  let token = localStorage.getItem("token");
  fetch("https://crack-corona-hack-backend.herokuapp.com/app/user/details/", {
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
      if (res.message === "User details") {
        document.getElementById("welcome").innerHTML = res.User.username;
      } else {

      }
    })
    .catch(err => {
      console.log(err);
    })

  // -----------------------------------------------------------------------------------------------------------------------

  //ADD DONATIONS JS  @Done

  document.getElementById("sub").addEventListener("click", function (e) {

    var itemname = document.getElementById("itemname").value;
    var quantity = document.getElementById("quantity").value;
    var description = document.getElementById("desc").value;


    let status = [];


    if (itemname.length <= 1) {
      document.getElementById("itemname").style.borderColor = "red";
      document.getElementById("itemname").value = "";
      document.getElementById("itemname").placeholder = "Please enter valid item name";
      status.push("false")
      document.getElementById("itemname").classList.add("red");
    } else {
      status.push("true")
    }
    if (quantity.length < 1) {
      document.getElementById("quantity").style.borderColor = "red";
      document.getElementById("quantity").value = "";
      document.getElementById("quantity").placeholder = "Please enter valid quantity";
      status.push("false")
      document.getElementById("quantity").classList.add("red");
    } else {
      status.push("true")
    }
    if (description.length <= 1) {
      document.getElementById("desc").style.borderColor = "red";
      document.getElementById("desc").value = "";
      document.getElementById("desc").placeholder = "Please enter valid description";
      status.push("false")
      document.getElementById("desc").classList.add("red");
    } else {
      status.push("true")
    }
    if (status.includes("false")) {
      console.log("There was some error while validating")
      return false
    }
    else {
      console.log("Validated")
      document.getElementById("sub").value = "Loading..."
      let token = (localStorage.getItem("token"));
      fetch("https://crack-corona-hack-backend.herokuapp.com/app/donation/", {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }),
        body: JSON.stringify({
          item_name: itemname,
          quantity: quantity,
          description: description
        }),
      })
        .then(res => {
          return res.json()
        })
        .then(res => {
          if (res.message.id) {
            document.getElementById("banner").style.backgroundColor = "green";
            document.getElementById("banner").style.display = "block";
            document.getElementById("banner").innerHTML = "You donation request has been submitted!!";
            document.getElementById("banner").classList.add("error");
            document.getElementById("sub").value = "Submit";
            setTimeout(() => {
              window.location.href = "donors.html";
            }, 2500)
          } else if (res.err == "User already exist") {
            document.getElementById("banner").style.backgroundColor = "red";
            document.getElementById("banner").style.display = "block";
            document.getElementById("banner").innerHTML = "User already exist!! Try signing in."
            document.getElementById("banner").classList.add("error");
            document.getElementById("sub").value = "Submit"
          } else {
            document.getElementById("banner").style.backgroundColor = "red";
            document.getElementById("banner").style.display = "block";
            document.getElementById("banner").innerHTML = "Unexpected error occurred"
            document.getElementById("banner").classList.add("error");
            document.getElementById("sub").value = "Submit"
          }
        })
        .catch(err => {
          document.getElementById("banner").style.backgroundColor = "red";
          document.getElementById("banner").style.display = "block";
          document.getElementById("banner").innerHTML = "It's on us! There was some error"
          document.getElementById("banner").classList.add("error");
          document.getElementById("sub").value = "Submit"
        })
    }
  });

  // -----------------------------------------------------------------------------------------------------------------------

  //LOGOUT JS  @Done

  document.getElementById("logout").addEventListener("click", function (e) {
    e.preventDefault()
    let token = localStorage.getItem("token");
    fetch("https://crack-corona-hack-backend.herokuapp.com/app/user/logout", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        console.log(res)
        if (res.message === "User logged out") {
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

  // -----------------------------------------------------------------------------------------------------------------------

  //VIEW PROFILE JS  @Done

  document.getElementById("profile").addEventListener("click", function (e) {
    e.preventDefault()
    let token = localStorage.getItem("token");
    fetch("https://crack-corona-hack-backend.herokuapp.com/app/user/details/", {
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

        if (res.message === "User details") {
          document.getElementById("pr_nameofuser").innerHTML = res.User.username;
          document.getElementById("pr_location").innerHTML = res.User.address;
          document.getElementById("pr_email").innerHTML = res.User.email;
          document.getElementById("pr_phone").innerHTML = res.User.phone_no;
        } else {

        }
      })
      .catch(err => {
        console.log(err);
      })
  })

  // -----------------------------------------------------------------------------------------------------------------------

  // VIEW DONATIONS JS

  document.getElementById("viewdonationjs").addEventListener("click", function getData(e) {
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

          console.log(res);
          let content = "";
          let serial = 0;
          res.Donations.forEach(ele => {
            let itemname = ele.item_name;
            let quantity = ele.quantity;
            let description = ele.description;
            serial = serial + 1;
            content = content + `<div class="card" id="viewdonationcards">
            <h5 class="card-header" style="background-color: gainsboro;" id="nameofitem">${itemname}</h5>
            <div class="card-body">
              <p class="card-text">
              <div style="font-size: 18px; font-weight: bolder; padding-bottom: 10px;" id="quanofitem">${quantity}</div>
              <div style="font-size: 18px;font-weight: bolder;" id="descofitem">${description}</div>
              </p>
            </div>
          </div>`
          })

          console.log(content)
          document.getElementById('viewdonationcards').innerHTML = content;


          
        }
      })
      .catch(err => {
        console.log(err);
      })


  })



  //SAMPLE


  function getData() {
    fetch('https://popularbreadapi.herokuapp.com/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + localStorage.getItem('pbToken')
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log('Saloni data')
        let content = "";
        let serial = 0;
        data.forEach(ele => {
          let name = ele.name;
          let url = ele.image;
          serial = serial + 1;
          content = content + `<tr>
                <td>
                  ${serial}
                </td>
                <td>
                  <img src='${url}' style="width : 200px; height : auto">
                </td>
                <td>
                  ${name}
                </td>
                <td>
                  <button>Update</button>
                </td>
                <td>
                  <button>Remove</button>
                </td>
              </tr>`
        })
        console.log(content)
        document.getElementsByTagName('tbody')[0].innerHTML = content;
      })
      .catch((err) => {
        Swal.fire(
          'Oopppsss..',
          'There was some internal error!',
          'error'
        )
      })
  }















  // -----------------------------------------------------------------------------------------------------------------------

  // VIEW HELP PROGRAMS JS

  document.getElementById("donor_help_programs").addEventListener("click", function (e) {
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

          //document.getElementById("nameofitem").innerHTML = res.Donations[0].item_name;
          //document.getElementById("quanofitem").innerHTML = res.Donations[0].quantity;
          //document.getElementById("descofitem").innerHTML = res.Donations[0].description;

        } else {

        }
      })
      .catch(err => {
        console.log(err);
      })


  })

  //----------------------------------------------------------------------------------------------------------------------------------

  // VIEW MESSAGES JS

  document.getElementById("viewmessage").addEventListener("click", function (e) {
    e.preventDefault()
    let token = localStorage.getItem("token");
    fetch("https://crack-corona-hack-backend.herokuapp.com/app/view_messages/", {
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

        if (res.message === "Donations found") {
          console.log(res);
          //document.getElementById("pr_nameofuser").innerHTML = res.User.username;
          //document.getElementById("pr_location").innerHTML = res.User.address;
          //document.getElementById("pr_email").innerHTML = res.User.email;
          //document.getElementById("pr_phone").innerHTML = res.User.phone_no;
        } else {

        }
      })
      .catch(err => {
        console.log(err);
      })
  })


};