var connection;

var openRequest = window.indexedDB.open('evolucional', 1);

openRequest.onupgradeneeded = e => {
    console.log('Cria ou altera um banco já existente');

    let minhaConnection = e.target.result;

    if(minhaConnection.objectStoreNames.contains('students')) {
        minhaConnection.deleteObjectStore('student');
    }
    
    minhaConnection.createObjectStore('students', {autoIncrement: true});
};

openRequest.onsuccess = e => {
    console.log('conexão obtida com sucesso');

    connection = e.target.result;
};

openRequest.onerror = e => {

    console.log(e.target.error);
}

function adiciona() {
    let transaction = connection.transaction(['students'], 'readwrite');

    let store = transaction.objectStore('students');

    let estudantes = [
        {
            "id":1,
            "ra":12346,
            "name":"Nome do aluno 1",
            "degreeId":1,
            "classId":1
        },
        {
            "id":2,
            "ra":456798,
            "name":"Nome do aluno 2",
            "degreeId":2,
            "classId":1
        },
        {
            "id":3,
            "ra":752156,
            "name":"Nome do aluno 3",
            "degreeId":3,
            "classId":2
        },
        {
            "id":4,
            "ra":852348,
            "name":"Nome do aluno 4",
            "degreeId":4,
            "classId":2
        },
        {
            "id":5,
            "ra":454643,
            "name":"Nome do aluno 5",
            "degreeId":6,
            "classId":2
        }
    ]

    estudantes.forEach(e => {
        console.log(e);
        let request = store.add(e);
        
        request.onsuccess = e => {
            console.log('estudante adicionado com sucesso');
        }

        request.onerror = e => {
            console.log('Não adicionado')
        }
   });    
}

function listaTodos() {

    let transaction = connection.transaction(['students'], 'readwrite');

    let store = transaction.objectStore('students');

    let cursor = store.openCursor();

    let estudantes = [];

    cursor.onsuccess = e => {
        let atual = e.target.result;

        if(atual) {
            let dado = atual.value;

            estudantes.push(dado);

            atual.continue();
        } else {
            console.log(estudantes);
        }
    };

    cursor.onerror = e => {
        console.log(e.target.error.name);
    }
}
