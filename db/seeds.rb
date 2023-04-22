User.create!(username:"test" , name:"Max Alba", password:"abcd1234", password_confirmation:"abcd1234", profile_picture: "")
User.create!(username:"test2" , name:"J", password:"abcd1234", password_confirmation:"abcd1234", profile_picture: "")

Chatroom.create!(topic:"We've Got Worm")
Chatroom.create!(topic: "We've Got Ward")
Chatroom.create!(topic:"Where the Wild Things Are")

Subscription.create!(user: User.find_by(username:"test"), chatroom:Chatroom.first)

User.first.subscriptions.first.messages.create!(chatroom:Chatroom.first, content: "Hellooo Chat")