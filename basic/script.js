 const firebaseConfig = {
      apiKey: "AIzaSyAlMFQxGI9duig3iS3XridMf1BLjxjQvh8",
      authDomain: "test-3d709.firebaseapp.com",
      projectId: "test-3d709",
      storageBucket: "test-3d709.appspot.com",
      messagingSenderId: "807303426940",
      appId: "1:807303426940:web:4a89cad57650061f342af9",
      measurementId: "G-7711GGB6G5"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    function submitMessage() {
      const name = document.getElementById('nameInput').value.trim();
      const message = document.getElementById('messageInput').value.trim();

      if (!name || !message) return alert('Both fields are required!');

      db.collection("guestbook").add({
        name,
        message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        document.getElementById('nameInput').value = '';
        document.getElementById('messageInput').value = '';
      }).catch(console.error);
    }

    db.collection("guestbook").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      const messagesDiv = document.getElementById('messages');
      messagesDiv.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const msg = document.createElement('div');
        msg.className = 'message';
        msg.innerHTML = `<strong>${data.name}</strong>: ${data.message}`;
        messagesDiv.appendChild(msg);
      });
    });