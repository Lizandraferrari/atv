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
        }else{
            verificarLogin()
        }
    }    
}

function verificarLogin() {
    var logado = sessionStorage.getItem('user');
  
    if (logado != "") {
        let nm = JSON.parse(logado);
        let nome = nm.nome;
        document.getElementById("sttlogin").innerHTML = `
        <a class="navbar-brand" href="index.html">
        <img src = "img/lgdoom.png" width="90px"></a>
        <p>Seja bem vindo ${nome}</p>
        <a style = "color:white" class="bi bi-bag-heart" href="carrinho.html"></a>
        </nav>
        `    
        return true;
    }else{
        return false;
    }
  }

function cadastro(){
    let login = document.querySelector('#login').value;
    let nome = document.querySelector('#nome').value;
    let endereco = document.querySelector('#endereco').value;
    let telefone = document.querySelector('#telefone').value;
    let senha = document.querySelector('#senha').value;
    let senha2 = document.querySelector('#senha2').value;


    var dados = JSON.parse(localStorage.getItem("banco")) || []; // caso n tenha sidi feita, retorna como um array vazio pra n d pau
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
   preco = parseFloat(preco)
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

function esvaziarCarrinho(){
    sessionStorage.removeItem("carrinho");    
}
function carrinho(){
    let itens = JSON.parse(sessionStorage.getItem("carrinho"));
                let visualiza = document.getElementById("compras");
                if(itens == null){
                    visualiza.innerHTML = `<p>Você não inseriu nenhum item no carrinho ):</p>`;
                }else{
                    let total = 0;
                    for(let i = 0 ; itens.length > i ; i++){
                        let img = itens[i].imagem;
                        let nm = itens[i].nome;
                        let val = itens[i].preco;
                        let qtd = itens[i].estoque;
                        
                        val = parseFloat(val)
                        qtd = parseInt(qtd);
                        total += val * qtd;

                        let att = document.createElement("div");
                        att.classList.add("row");//add uma class pro elemento criado = "row"

                        let card = document.createElement("div");
                        card.classList.add("card", "prod");

                        card.innerHTML = `
                            <img src="${img}">
                            <label class="">${nm}</label>
                            <label>Preço por item: R$ ${itens[i].preco.toFixed(2)}</label>
                            <label>Quantidade: ${qtd}</label>
                        `;

                        att.appendChild(card);//cada divisão tem outra div
                        visualiza.appendChild(att);//o container sobe essa div nova

                    }
                    total = total.toFixed(2)
                    let teste = document.getElementById("teste");
                        teste.innerHTML =`<label> Total: R$${total}</label> `;
                        
                }
}
function escolha(){
    let opc = document.getElementById("pagar").value
    let pague = document.querySelector(".pague");

    if (opc == "pix"){
        pague.innerHTML = `
        <br><br>
        <span>Para concluir o pagamento é só escanear o QR Code a seguir que em até 5 minutos após aprovação, será aprovado </span>
        <br><br>
        <img src = "img/qrcode.png" width = "300px">
        <
        `;
    }else if (opc == "cartao"){
        pague.innerHTML = `
        <br><br>
        <form>
        <label> Digite os 16 digitos do cartão de crédito:</label><br>
        <input id = "numero" type = "text" placeholder = "Digite os números do seu cartão"><br><br>
        <label> Digite o nome do titular: </label><br>
        <input id = "nome" type = "text" placeholder = "Digite o nome como consta no cartão"><br><br>
        <label> Digite o código de segurança:</label><br>
        <input id = "cvv" type = "text" placeholder = "Digite os 3 ultimos digitos de trás do cartão"><br><br>
        <label> Digite a data de vencimento</label><br>
        <input id = "data" type = "text" placeholder = "mm/aa"><br><br>
        <label>Selecione a quantidade de parcelas que deseja:</label><br>
        <select name="parcela" id="parcela">
        <option value =""></option>
          <option value="1">1x sem juros</option>
          <option value="2">2x sem juros</option>
          <option value="3">3x sem juros</option>
          <option value="4">4x com juros</option>
          <option value="5">5x com juros</option>
          <option value="6">6x com juros</option>
        </select><br><br>
        <button class = "botoes" type = "submit" onclick = "conferecartao()">Conclua o pagamento</button>
        </form>
        `;
    }else if (opc == "boleto"){
        pague.innerHTML = `        
        <br><br>
        <a href="img/boleto.pdf" download>Clique aqui para baixar o boleto! </a>
        `;
    }else{
        pague.innerHTML = ``;
    }
}
function conferecartao(){
    let numero = document.getElementById("numero").value;
    let nome = document.getElementById("nome").value;
    let cvv = document.getElementById("cvv").value;
    let data = document.getElementById("data").value;
    let parcela = document.querySelector("parcela").value;

    if (numero == "" || nome  == "" || cvv == "" || data  == "" || parcela == "" ){
        alert('Preencha todos campos corretamente para validar sua compra!');
    }else{
        alert('Sua compra será validada pelo banco e encaminhada para nós. Obrigado pela sua compra!');
    }
}