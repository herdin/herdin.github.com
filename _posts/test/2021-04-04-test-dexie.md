---
layout: post
title: color picker pickr
date: 2021-04-04
tags: test
---

<!-- Include Dexie -->
<script src="https://unpkg.com/dexie@latest/dist/dexie.js"></script>
<script>
    //
    // Define your database
    //
    var db = new Dexie("friend_database");
    db.version(1).stores({
        friends: 'name,shoeSize'
    });

    //
    // Put some data into it
    //
    db.friends.put({name: "Nicolas", shoeSize: 8}).then (function(){
        //
        // Then when data is stored, read from it
        //
        return db.friends.get('Nicolas');
    }).then(function (friend) {
        //
        // Display the result
        //
        alert ("Nicolas has shoe size " + friend.shoeSize);
    }).catch(function(error) {
       //
       // Finally don't forget to catch any error
       // that could have happened anywhere in the
       // code blocks above.
       //
       alert ("Ooops: " + error);
    });
</script>