function logar(){
    //loga o usuario
    let login = document.querySelector('#loginNav').value;
    let senha = document.querySelector('#senhaNav').value;

    var dados = JSON.parse(localStorage.getItem("banco")) || [];
    if(login == "" || senha == ""){
        alert('Preencha todos os campos para logar com sucesso');
    }else{
        let verifica = false;
        for(let i = 0 ; dados.length > i ; i++){
            if(login == dados[i].login && senha == dados[i].senha){
                let statuslogin = JSON.stringify(dados[i]);
                sessionStorage.setItem("user" , statuslogin);
                verifica = true;
                alert('Logado com sucesso!')
                break;
            }
        }
        if(verifica == false){
            alert('Você digitou tudo corretamente?');
        }
    }    
}

function verificarLogin() {
    var logado = sessionStorage.getItem('user');
  
    if (logado != "") {
        //let nome = logado.nome
      document.getElementById("sttlogin").innerHTML = "<i>Boas compras!</i>"
    }
  }

function cadastro(){
    let login = document.querySelector('#login').value;
    let nome = document.querySelector('#nome').value;
    let endereco = document.querySelector('#endereco').value;
    let telefone = document.querySelector('#telefone').value;
    let senha = document.querySelector('#senha').value;
    let senha2 = document.querySelector('#senha2').value;


    var dados = JSON.parse(localStorage.getItem("banco")) || []; // caso esteja sem conteudo, retorna como um array vazio
    let user = {
        id: Date.now() , login: login , senha: senha , nome: nome , telefone: telefone , endereco: endereco
    };
        if (nome == "" ||  endereco == "" ||telefone == "" ||login == ""|| senha == ""||senha2 == ""){
            alert('Preencha todos os campos');
        }else{
            if (senha != senha2){
                alert('As senhas estão diferentes');
            }else{
                let verifica = true;
                if (localStorage.getItem("banco") == null){
                    verifica = true;
                }else{
                for(let i = 0 ; dados.length > i ; i ++){
                    if(login == dados[i].login){
                        verifica = false;
                        alert('E-mail já cadastrado');
                        break;
                    }                  
                } 
            }
                if (verifica == true){
                    dados.push(user);
                    localStorage.setItem("banco", JSON.stringify(dados));
                    alert('Cadastro feito com sucesso! Redirecionando para a página inicial');
                    window.location.href="index.html";
                }             
            }
        }
        
    }

function carrinhoAdd(produto){

   let nome = produto.querySelector('label').textContent;
   let preco = produto.querySelector('i').textContent;
   let imagem = produto.querySelector('img')
   let linkimagem = imagem.src;

   let compra = JSON.parse(sessionStorage.getItem("carrinho"))||[];

   if (sessionStorage.getItem("carrinho") == null || sessionStorage.getItem("carrinho") == []){
   let escolhido = {
    nome:nome , preco:preco , imagem:linkimagem , estoque: 1
   };
    compra.push(escolhido);
    sessionStorage.setItem("carrinho",JSON.stringify(compra));

    }else{
        let verifica = false;
        for(let i = 0 ; compra.length > i; i++){
            if(nome == compra[i].nome){
                compra[i].estoque++;
                
                sessionStorage.setItem("carrinho", JSON.stringify(compra));
                verifica = true;
                break;
            }
        }
        if (verifica == false){
            let escolhido = {
                nome:nome , preco:preco , imagem:linkimagem , estoque: 1
               };
                compra.push(escolhido);
                sessionStorage.setItem("carrinho",JSON.stringify(compra));
        }
    }   
}