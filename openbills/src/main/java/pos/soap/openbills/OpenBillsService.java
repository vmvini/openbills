/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pos.soap.openbills;

import javax.annotation.PostConstruct;
import javax.jws.WebMethod;
import javax.jws.WebService;

/**
 *
 * @author vmvini
 */
@WebService
public class OpenBillsService {
    
    @WebMethod
    public String hello(String name){
        return "hello " + name;
    }
    
    @PostConstruct
    public void init(){
        //usar para enviar dados para o neo4j e mongodb
    }
    
}
