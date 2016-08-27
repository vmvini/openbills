/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pos.soap.openbills;

import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author vmvini
 */

//@XmlRootElement(name = "ResultadoCandidatoValorBem")
//@XmlAccessorType(XmlAccessType.FIELD)
public class ResultadoCandidatoValorBem {
    
    //@XmlElement(name = "resultado")
    private List<CandidatoValorBem> results;

    public List<CandidatoValorBem> getResults() {
        return results;
    }

    public void setResults(List<CandidatoValorBem> results) {
        this.results = results;
    }
    
    
    
}
