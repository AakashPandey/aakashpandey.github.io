 var str = "";
    var MSGS = {
        "": "Hey there 🖐, you're welcome to my web page! Feel free to explore & enjoy your stay. 🍁",
        "blog": "I recently started with blog writing, you can check some of my articles below. \n[Tip]  Use the back button for previous page or tap the logo to return home.",
        "contact": "Would you like to work together? Feel free to reach me using the links below.",
        "projects":"You can find a brief description of my recent projects, for more details just ping me mentioning about it.",
        "vault": "[WIP] The content on this section is only accessible by certain people. Use the channel code & secret key, if you have any!"
    }
    var ref;

    var clrdyn = () => {
        document.getElementById("dyn").innerHTML = "";
    }

    var pathEvents = (p) => {
        clrdyn();      
        irt = 0;
        str = MSGS[p];
        if(!sessionStorage[p]) {
            setTimeout(()=>{sessionStorage[p] = 1;type()}, 170) 
        } else {
            clrdyn();
            clearInterval(ref);
            setTimeout(()=>{clearInterval(ref);clrdyn();type(1)}, 170)
        }

    }

    var pause = (ms) => {
        return new Promise((resolve) => {
            ref = setTimeout(resolve, ms)
        });
    }

    var fluc = () => {
        TS = 15;
        T = TS + Math.floor(Math.random() * (35 - 15 + 1)) + 15;
        return (T);
    }

    var irt = 0;
    var TS = 15;

    async function type(p) {
        if (p) {
            clearInterval(ref);
            clrdyn();
            document.getElementById("dyn").innerHTML = str;
            return;
        }
        id = "dyn";
        if (irt < str.length) {
            document.getElementById(id).innerHTML = document.getElementById(id).innerHTML + str.charAt(irt);
            (str.charAt(irt) === "!" || str.charAt(irt) === "," || str.charAt(irt) === "." || str.charAt(irt) === "&" || str.charAt(irt) === "?") ? TS += 250 : TS = fluc();
            document.getElementById(id).scrollTop = 9000;
            irt++;
            await pause(TS);
            type();
        }
    }
