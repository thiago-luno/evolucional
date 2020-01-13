angular.module('myApp').filter("search", function() {

    return function(input, searchDegree, searchClass){

        let teachers = [];

        if(arguments[1] && arguments[2]) { //searchDegree && searchClass
            input.forEach(teacher => {
                if(teacher.degrees) {
                    if(teacher.degrees.find(degree => searchDegree.id === degree.degreeId)) {
                        teacher.degrees.forEach(clas => {
                            if(clas.classes.find( c => searchClass.id === c.classId)) {
                                if(!teachers.find( i => i.id === teacher.id)) {
                                    teachers.push(teacher);
                                }          
                            }
                        })                         
                    }
                }
            }) 
            return teachers;
        }

        else if(arguments[1]) { //searchDegree
           input.forEach(teacher => {
               if(teacher.degrees) {
                    if(teacher.degrees.find(degree => searchDegree.id === degree.degreeId)) {
                        if(!teachers.find( i => i.id === teacher.id)) {
                            teachers.push(teacher);
                        }
                    }
               }
           })
           return teachers
        } 

        else if(arguments[2]) { //searchClass
            input.forEach(teacher => {
                if(teacher.degrees) {
                    teacher.degrees.forEach(degree => {
                        if(degree.classes) {
                            if(degree.classes.find(clas => searchClass.id === clas.classId)) {
                                if(!teachers.find( i => i.id === teacher.id)) {
                                    teachers.push(teacher);
                                }
                            }
                        }
                    })
                }         
            })
            return teachers
        }
 
        else{
            return input;
        }
    }
});