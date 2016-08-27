/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pos.soap.openbills;

import java.util.Iterator;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jws.WebMethod;
import javax.jws.WebParam;
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
    
    
    /*
    Use an array instead of an ArrayList as JAXB cannot handle collections as top-level objects, only as properties of beans. Alternatively, create a bean and put the ArrayList in it.

    See bug: JAXB-223: JAXB doesn't support collection classes as top level objects
    http://stackoverflow.com/questions/6609770/returning-an-arraylist-from-a-webservice-in-java
    */
    @WebMethod()
    public List<CandidatoValorBem> getBensDeclaradosAosAnos(@WebParam(name="cpf") String cpfCandidato){
        System.out.println("CPF CANDIDATO: " + cpfCandidato);
        //ResultadoCandidatoValorBem r = new ResultadoCandidatoValorBem();
        //r.setResults(repository.getCandidatoValorBem(cpfCandidato));
        List<CandidatoValorBem> lista = repository.getCandidatoValorBem(cpfCandidato);
        
        Iterator<CandidatoValorBem> it = lista.iterator();
        while(it.hasNext()){
            System.out.println("item: ");
            System.out.println(it.next());
        }
        
        return lista;
       
        
        /*Iterator<Object[]> it = lista.iterator();
        while(it.hasNext()){
            Object[] arr = it.next();
            for(int i = 0; i < arr.length; i++){
                System.out.println(arr[i]);
            }
        }*/
        
    }
    
    
    @PostConstruct
    public void init(){
        if(repository == null){
            System.out.println("REPOSITORIO ESTA NULO");
        }
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
