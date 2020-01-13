angular.module('myApp').factory("serverAPI", function($http) {
    return {
        
        getTeachers: function() {
            return $http.get('server/teachers.json').then(function(response) {
                return response.data;
            });
        },

        getRelationships: function() {
            return $http.get('server/relationships.json').then(function(response) {
                return response.data;
            });
        },

        getTeacherRelationship: function(teacherId) {
            return $http.get('server/relationships.json').then(function(response) {
                return response.data.find(e => teacherId === e.teacherId);
            });
        },

        getMatters: function() {
            return $http.get('server/matters.json').then(function(response) {
                return response.data;
            });
        },

        getMattersName: function(matterId) {
            return $http.get('server/matters.json').then(function(response) {
                let obj = response.data.find( e => matterId === e.id);
                return obj.name;
            });
        },

        getStudents: function() {
            return $http.get('server/students.json').then(function(response) {
                return response.data;
            });
        },

        getStudentsByDegree: function(degreeId) {
            return $http.get('server/students.json').then(function(response) {
                response.data = response.data.filter( student => student.degreeId === degreeId);
                return response;
            });
        },

        getDegrees: function() {
            return $http.get('server/degrees.json').then(function(response) {
                return response.data;
            });
        },

        getDegreeName: function(degreeId) {
            return $http.get('server/degrees.json').then(function(response) {
                let obj = response.data.find( e => degreeId === e.id);
                return obj.name;
            });
        },

        getClasses: function() {
            return  $http.get('server/classes.json').then(function(response) {
                return response.data.classes;
            });
        },

        getClasseName: function(classId) {
            return $http.get('server/classes.json').then(function(response) {
                let obj = response.data.classes.find( e => classId === e.id);
                return obj.name;
            });
        },
    }
})