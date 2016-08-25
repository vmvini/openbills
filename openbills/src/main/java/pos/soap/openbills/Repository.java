/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pos.soap.openbills;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

/**
 *
 * @author vmvini
 */

@Stateless
public class Repository {
    
    @PersistenceContext
    private EntityManager em;
    
    public List<CandidatoValorBem> getCandidatoValorBem(String cpf){
        String sql = "select distinct b.ANO_ELEICAO anoEleicao,"
                +" c.CPF_CANDIDATO cpfCandidato, c.NOME_CANDIDATO nomeCandidato, "
                +" sum (b.VALOR_BEM) valorBem from BEM_CANDIDATO b, CONSULTA_CAND c "
                +"WHERE c.CPF_CANDIDATO = ? AND "
                +"c.SEQUENCIAL_CANDIDATO = b.SQ_CANDIDATO "
                +"group by b.ANO_ELEICAO, c.CPF_CANDIDATO, c.NOME_CANDIDATO order by b.ANO_ELEICAO asc";
        
        
        Query query = em.createNativeQuery(sql, "CandidatoValorBemMapping");
        query.setParameter(1, cpf);
        List<CandidatoValorBem> results = query.getResultList();
        return results;
    }
    
    
    
    
}
