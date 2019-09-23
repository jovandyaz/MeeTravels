class RouteManager {
    constructor(){
        this.locations = []
        this.userData=[]
        this.point = {lat:"",lng:""}
    }
    
    async getLocation(location){
        let data = await $.get(`location/${location}`)
        let validator = this.locations.find(l =>l.name==location.name)
        if(!validator){
            let newLoc = {...data}
            this.locations.push(newLoc)
            return newLoc
        }
    }
    async getUserData(){
        let data = await $.get(`/users`)
        this.userData = data
        return data
    }
    signUp(user){
        $.post('/newUser',user,()=>console.log(user))
    }
    
}

        
    
      