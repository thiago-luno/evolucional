angular.module('myApp').controller('professoresCtrl', function($scope, $q, serverAPI) {

    // variables
    $scope.teachers = [];
    $scope.relationships = [];
    $scope.matters = [];
    $scope.studentDegree = [];

    $scope.aux = [];
    $scope.aux2 = [];
    $scope.step = 1;
    
    $scope.init = () => {
        
        $q.all([
            serverAPI.getTeachers(), 
            serverAPI.getRelationships(), 
            serverAPI.getMatters(),
        ])
        .then((values) => {
            $scope.teachers = values[0];
            $scope.relationships = values[1];
            $scope.matters = values[2];
            
            $scope.buildTeacher();
        })
    }

    $scope.init();

    $scope.buildTeacher = () => {
        $scope.teachers.forEach(teacher => {
            serverAPI.getTeacherRelationship(teacher.id).then( r => {
                if(r) {
                    teacher.matterId = r.matterId;
                    teacher.degrees = r.degrees;

                    serverAPI.getMattersName(teacher.matterId).then(m => {
                        teacher.matter = m;
                    
                        teacher.degrees.forEach( degree => {
                            serverAPI.getDegreeName(degree.degreeId).then(d => {
                                if(d) { degree.degreeName = d;}
                            })

                            degree.classes.forEach( clas => {
                                serverAPI.getClasseName(clas.classId).then(c => {
                                    if(c) { clas.className = c; }
                                })
                            })
                        })
                    })
                }
            })
       });
    }  

    $scope.clear = () => {
        $scope.studentDegree = [];
    }

    $scope.getStudentsDegree = (degreeId) => {
        serverAPI.getStudentsByDegree(degreeId).then(s => $scope.studentDegree = s.data);
    }

    $scope.register = (step) => {

        $scope.step = step;

        switch(step) {
            case 1:
                $scope.showOverlay=true;     
                break;

            case 2:  
                break;

            case 3:
                if(!$scope.newTeacher.matter) {
                    $scope.newTeacher.matterId = $scope.newTeacher.teacherMatter.id;
                    $scope.newTeacher.matter = $scope.newTeacher.teacherMatter.name;
                    delete $scope.newTeacher['teacherMatter'];               
                }
                break;

            case 4:
                let obj = {degreeId:$scope.newTeacher.teacherDegree.id, 
                           degreeName: $scope.newTeacher.teacherDegree.name};

                if($scope.newTeacher.degrees) {
                    if($scope.newTeacher.degrees.find(e => e.degreeId === $scope.newTeacher.teacherDegree.id)) {
                        return;
                    } else {
                        $scope.aux.push(obj);
                    }
                   
                } else {
                    $scope.aux = [];
                    $scope.aux.push(obj);    
                    }

                    $scope.auxCopy = angular.copy($scope.aux);
                    $scope.newTeacher.degrees = $scope.aux;
                    delete $scope.newTeacher['teacherDegree'];  
                    break;

            case 5:
                $scope.aux2 = [];
                
                $scope.classes.forEach(e => {
                    if(e.selected) {
                        let classId = e.id;
                        let className = e.name;
                        $scope.aux2.push({"classId": classId, "className": className})
                    }
                })

                let lastPosition = $scope.newTeacher.degrees.length-1;
                $scope.newTeacher.degrees[lastPosition].classes = $scope.aux2;
                delete $scope.newTeacher['classes'];
                let largerId = Math.max.apply(null, $scope.teachers.map( e => e.id)) + 1;
                $scope.newTeacher.id = largerId;
                break;
        }
    }

    $scope.saveRegister = () => {
        $scope.teachers.push($scope.newTeacher);
        $scope.clearRegister(); 
        $scope.showOverlay=false;    
    }

    $scope.clearClasses = () => {
        $scope.classes.forEach(e => e.selected = false);
    }
    
    $scope.clearRegister = () => {
        $scope.newTeacher = {};
        $scope.clearClasses();
        $scope.newTeacher = {classes:[]};
    }

    $scope.hasActive = () => { return $scope.classes.find(e => e.selected); }
    
});