angular.module('myApp').controller('estudanteCtrl', function($scope, $q, serverAPI) {

    //variables
    $scope.students = [];
    $scope.copyStudents = [];
    $scope.degrees = [];
    $scope.classes = [];
    $scope.editsuccess = false;
   
    $scope.init = () => {

        $q.all([
            serverAPI.getStudents(), 
            serverAPI.getDegrees(), 
            serverAPI.getClasses()
        ])
        .then((values) => {
            $scope.students = values[0];
            $scope.degrees = values[1];
            $scope.classes = values[2];

            $scope.buildStudents();
            $scope.copyStudents = angular.copy($scope.students);
            $scope.buildGraph();
        })
    }
    
    $scope.init();

    $scope.buildStudents = () => {
        $scope.students.forEach(element => {
            let classe = $scope.classes.find( e => element.classId === e.id);
            let serie =  $scope.degrees.find( e => element.degreeId === e.id)

            element.degreeName = serie.name;
            element.className =  classe.name;
        });
    }

    $scope.cancelEdit = (index, key) => {
        $scope.students[index].editName = false;
        $scope.students[index].editClass = false;

        if(!$scope.editsuccess) {
            $scope.students[index][key] = $scope.copyStudents[index][key];
            $scope.editsuccess = false;
        }
    }

    $scope.changeStudentData = (value, index, key) => {
        let oldValue = $scope.copyStudents[index][key];

        if(oldValue !== value) {
            $scope.students[index][key] = value;
            $scope.copyStudents[index][key] = value;
            $scope.editsuccess = true;

            if(key ==='className') {

                let student =  $scope.classes
                                .find( e => e.name === $scope.students[index][key]);

                $scope.students[index].classId = student.id;
                $scope.copyStudents[index].classId = student.id;
            }
        } 
    }
    
    $scope.editMode = (index, field) => {
        $scope.editsuccess = false;

        let el;

        switch(field) {
            
            case 'name':
                $scope.students[index].editName = true;
                el = document.querySelector(`#name${index}`);
                el.focus();
                break;

            case 'className':
                $scope.students[index].editClass = true;
                el = document.querySelector(`#className${index}`);
                el.focus();
                break;
        }
    }    

    $scope.addStudents = (quantity) => {
        let student = {};
        let largerId = Math.max.apply(null, $scope.students.map( e => e.id)) + 1;
        let RA = $scope.students.map(e => e.ra);
        let validRA = false;


        while(!validRA) {

            if(RA.find( e => e === Math.floor(Math.random()*100000)) === undefined)
                validRA = true;
        }

        for (let i = largerId; i < (quantity + largerId) ; i++) {
            let degree = $scope.degrees[Math.floor(Math.random()*$scope.degrees.length)];
            let classe = $scope.classes[Math.floor(Math.random()*$scope.classes.length)];

            student = 
                {
                    "id":i,
                    "ra":Math.floor(Math.random()*100000),
                    "name":`Nome do aluno ${i}`,
                    "degreeId":degree.id,
                    "degreeName": degree.name, 
                    "classId":classe.id,
                    "className": classe.name

                };

            $scope.students.push(student);
            $scope.copyStudents = angular.copy($scope.students); 
            $scope.buildGraph();
        }      
    }

    $scope.buildGraph = () => {
        let degrees = [];

        $scope.students.forEach(student => {
            if(degrees.filter(i => student.degreeId === i.degreeId).length === 0) {
                degrees.push({ 
                    degreeId : student.degreeId,
                    degreeName: student.degreeName
                })
            }
        })

        degrees.forEach(degree => {
         degree['qtd'] = $scope.students.filter( student => student.degreeId === degree.degreeId).length;
        })

        degrees = degrees.map(degree => {

            return  { c:
                     [
                         {v: degree.degreeName},
                         {v: degree.qtd}
                     ]   
                }
        })

        $scope.myChartObject = {};
    
        $scope.myChartObject.type = "BarChart";
        
        $scope.myChartObject.data = {
            "cols": [
                {id: "t", label: "Degree", type: "string"},
                {id: "s", label: "Alunos", type: "number"}
            ],           
        };

        $scope.myChartObject.data['rows'] = (degrees);
        $scope.myChartObject.options = {
            'title': 'Distribuição dos alunos',
            'colors': ['#09a5df'],
            'hAxis': {title: 'Quantidade', titleTextStyle: {color: '#657480'}},
        };
    }
});