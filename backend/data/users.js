import bcrypt from 'bcryptjs'

const users=[
    {
        name:'Admin',
        email:'admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Rahul Kumar',
        email:'rahul@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
    },
    {
        name:'Vishu Bose',
        email:'vishu@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:false
    }, 
    {
        name:'Ritesh Rao',
        email:'ritesh@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:false
    },
    {
        name:'Piyush Singh',
        email:'piyush@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:false
    },
    {
        name:'Devesh Singh',
        email:'devesh@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:false
    },
]

export default users;