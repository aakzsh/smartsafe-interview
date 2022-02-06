const db = fb.firestore();
const nameInput = document.querySelector(".name")
const roomIdInput = document.querySelector(".room-id")

const role = document.querySelector('.role');

const startBtn = document.querySelector(".start-btn")



// const fb =  firebase.initializeApp(firebaseConfig);

startBtn.addEventListener("click", (e) => {
    e.preventDefault()
    // console.log(nameInput.value, roomIdInput.value, role.value)

    const roomId = roomIdInput.value
    const romle = role.value
    const name = nameInput.value
    if(romle == "1"){

        data = {
           "interviewer" : {

                'name' : name,
                'stt' : ''
            }
            
        }
    } else {
        data = {
            "interviewee" : {
 
                 'name' : name,
                 'stt' : ''
             }
             
         }
    }


    db.collection('rooms')
        .doc(roomId)
        .get()
        .then(doc => {
            if(doc.exists) {

                db.collection('rooms')
                .doc(roomId)
                .update(data)
                .then(() => {
                    console.log("success")
                    window.location.href="started.html"
                })
                .catch(err => console.error(err))

            } else {

                db.collection('rooms')
                .doc(roomId)
                .set(data)
                .then(() => {
                    console.log("success")
                    window.location.href="started.html"
                })
                .catch(err => console.error(err))

            }
        })

        // .then(()=>{
        //     window.location.href="started.html"
        // })
   


       

})




