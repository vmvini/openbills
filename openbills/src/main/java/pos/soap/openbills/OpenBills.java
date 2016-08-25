/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pos.soap.openbills;

import java.util.List;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jws.WebMethod;
import javax.jws.WebService;

/**
 *
 * @author vmvini
 */
@WebService
public class OpenBills {
    
    @Inject
    private Repository repository;
    
    @WebMethod
    public String hello(String name){
        return "hello " + name;
    }
    
    @WebMethod
    public List<CandidatoValorBem> getBensDeclaradosAosAnos(String cpfCandidato){
        return repository.getCandidatoValorBem(cpfCandidato);
    }
    
    
    @PostConstruct
    public void init(){
        //usar para enviar dados para o neo4j e mongodb
        
        //enviar para neo4j:
            //id de financiadores de campanha
            //cpf de politicos
            //passar para o neo4j os relacionamentos entre os 2
        
        
        //enviar para mongodb:
                //todos os politicos
                //Documento Politico deve ser:
                    //Nome
                    //CPF
                    //outras informações se necessário...
                
    }
    
}
