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
                    document.getElementById("pr_nameoforg").value = res.Organization.org_name;
                    document.getElementById("pr_location").value = res.Organization.address;
                    document.getElementById("pr_link").value = res.Organization.web_link;
                    document.getElementById("pr_desc").value = res.Organization.description;
                    document.getElementById("pr_email").value = res.Organization.email;
                    document.getElementById("pr_phone").value = res.Organization.phone_no;
                    document.getElementById("pr_area").value = res.Organization.areas_catered;
                } else {
                    
                }
            })
            .catch(err => {
                console.log(err);
            })
    })

}