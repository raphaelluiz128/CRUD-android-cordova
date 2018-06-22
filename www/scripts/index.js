// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

   
    function onDeviceReady() {
        //registro de funções para elementos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        document.getElementById('SBLogin').addEventListener('click', EfetuarLogin, false);
        document.getElementById('SBCadastrarU').addEventListener('click', SalvarUsuario, false);
      document.getElementById('SBMUsuarios').addEventListener('click', MostrarUsuarios, false);
      document.getElementById('SBApagarU').addEventListener('click', DeletarUsuarios, false);
        // var nome = document.getElementById("ITNome");
      
               
        var db = window.sqlitePlugin.openDatabase({ name: "base", location: 0 });

    
        //criação de tabela
        db.transaction(function (tx) {
          
            tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id integer primary key, nome text,senha text ,tel text)');
        });
         
        MostrarUsuarios();

      //função de efetuar login

        function EfetuarLogin() {
       
            db.transaction(function (tx) {
               
                tx.executeSql("SELECT * FROM usuarios where nome = (?) and senha = (?)", [ITNomeL.value, ITSenhaL.value], function (tx, res) {
                    
                    alert("quantidade" + res.rows.length);
                     //alert(ITNome.value);
                      // var msg = new Windows.UI.Popups.MessageDialog("quantidade" +res.rows.length);
                      //msg.showAsync();
                   // alert(res.rows.item(i)['nome']);
                 });

                 });
               //alert('Obrigado sr(a) ' + nome.value + ' os seus dados foram encaminhados com sucesso');
        } //fim do EfetuarLogin

        
        function MostrarUsuarios() {
            
            var table = document.getElementById('tbody-register');

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM usuarios', [], function (tx, resultado) {
                    var rows = resultado.rows;
                    var tr = '';
                    
                    for (var i = 0; i < rows.length; i++) {
                        tr += '<tr>';
                       // tr += '<td <script> $(this).on("click",function(){ atualizar(' + rows.item(i)['id'] + ');});</script> >' + rows.item(i)['nome'] + '</td>';
                      //  tr += '<td'+  <script type="text/javascript"> $(this).on("click",function(){ atualizar(rows.item(i)["id"])}); </script> +'>' + rows.item(i)["id"] + '</td>';
                      //   tr += '<td onClick="atualizar(' + rows.item(i)['id'] + ')">' + rows.item(i)['nome'] + '</td>';
                    //    tr += '<td <script type="text/javascript"> $(this).on("click",function(){ atualizar(rows.item(i)["id"])}); </script>>'+'Editar'+'</td>';
                        tr += '<td class="tdid">' + rows.item(i)['id'] + '</td>';
                        tr += '<td class="tnome">' + rows.item(i)['nome'] + '</td>';
                        tr += '<td>' + rows.item(i)['senha'] + '</td>';
                            tr += '<td>' + rows.item(i)['tel'] + '</td>';
                        tr += '</tr>';
                  
                    }

                   table.innerHTML = tr;
                  
                }, null);
            });
        }



        function DeletarUsuarios() {

            var id = document.getElementById('field-id').value;

            db.transaction(function (tx) {
                tx.executeSql("DELETE FROM usuarios WHERE id=?", [id]);
            });

            MostrarUsuarios();
            limpaCampo();
            //inputSHOW(false);
        }

      
    
        function atualizar(cod) {
            
            var id = document.getElementById('field-id');
            var nome = document.getElementById('field-name');
            var senha = document.getElementById('field-pass');
            var tel = document.getElementById('field-tel');
            
            id.value = cod;

            //alert("teste");

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM usuarios WHERE id=?', [cod], function (tx, resultado) {
                   

                    nome.value = resultado.rows.item(0)['nome'];
                    senha.value = resultado.rows.item(0)['senha'];
                    tel.value = resultado.rows.item(0)['tel'];
                });
            });
           // inputSHOW(true);
        }



        
        function errorCB(erropu) {
            alert("Error processing SQL: " + erropu.code);
        }

     



        function SalvarUsuario() {
            var id = document.getElementById('field-id').value;
            var nome = document.getElementById('field-name').value;
            var pass = document.getElementById('field-pass').value;
            var tel = document.getElementById('field-tel').value;
            alert(id);
            db.transaction(function (tx) {
                if (id){
                    tx.executeSql('UPDATE usuarios SET nome=?, senha=?, tel=? WHERE id=?', [nome,pass,tel,id],null);
                    alert("Alterado com sucesso !")
                    
                } else {
                    tx.executeSql("INSERT INTO usuarios (nome,senha,tel) VALUES (?,?,?)", [nome,pass,tel]); {
                    
                        alert("O usuário foi cadastrado com sucesso!!!");
                    
                        //   alert(nome);
                        // var msg = new Windows.UI.Popups.MessageDialog("quantidade" +res.rows.length);
                        //msg.showAsync();
                        // alert(res.rows.item(0)['nome']);
                    }
                }
                });
                MostrarUsuarios();
                limpaCampo();
                //alert('Obrigado sr(a) ' + nome.value + ' os seus dados foram encaminhados com sucesso');
            } //fim do cadastrar usuário

            
        function cliqueCol() {
            $(document).on('click', '.tdid', function () {
                //var nomePessoa = $(this).parent().parent().find(".tdid").text();
                var idUsuario = $(this).parent().find(".tdid").text();

                
                atualizar(idUsuario);
                // alert(idUsuario);

            });
        }





        cliqueCol();



        function onPause() {

        };

        function onResume() {
           
        };




    };
   
    
} )();