//LOGOUT JS

window.onload = function () {

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

    //VIEW PROFILE JS
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


    //ADD HELP PROGRAMME JS

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
                    prg_name:progname,
                    description:progdesc,
                    aid_provided:progaid,
                    city:progcity,
                    address:progaddr
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
    

}