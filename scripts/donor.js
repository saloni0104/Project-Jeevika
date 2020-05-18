window.onload = function () {

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

    //VIEW PROFILE JS
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
          console.log(res);
          if (res.message === "User details") {
            document.getElementById("pr_nameofuser").innerHTML = res.User.username;
            document.getElementById("pr_location").innerHTML = res.User.address;
            document.getElementById("pr_email"). innerHTML = res.User.email;
            document.getElementById("pr_phone"). innerHTML = res.User.phone_no;
          } else {

          }
        })
        .catch(err => {
          console.log(err);
        })
    })

  };