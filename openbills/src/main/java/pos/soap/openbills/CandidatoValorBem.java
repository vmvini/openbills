/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pos.soap.openbills;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.SqlResultSetMapping;

/**
 *
 * @author vmvini
 * Classe que representa em quantos reais um candidato declarou em bens em determinado ano
 */

@SqlResultSetMapping(
        name = "CandidatoValorBemMapping",
        classes = @ConstructorResult(
                targetClass = CandidatoValorBem.class,
                columns = {
                    @ColumnResult(name = "anoEleicao", type = int.class),
                    @ColumnResult(name = "cpfCandidato"),
                    @ColumnResult(name = "nomeCandidato"),
                    @ColumnResult(name = "valorBem", type = double.class )}))


public class CandidatoValorBem {
    
    private String anoEleicao;
 
    private double valorBem;
    
    private String cpfCandidato;
    
    private String nomeCandidato;

    
    public CandidatoValorBem(String anoEleicao, double valorBem, String cpfCandidato, String nomeCandidato) {
        this.anoEleicao = anoEleicao;
        this.valorBem = valorBem;
        this.cpfCandidato = cpfCandidato;
        this.nomeCandidato = nomeCandidato;
    }

    public String getAnoEleicao() {
        return anoEleicao;
    }

    public void setAnoEleicao(String anoEleicao) {
        this.anoEleicao = anoEleicao;
    }

    public double getValorBem() {
        return valorBem;
    }

    public void setValorBem(double valorBem) {
        this.valorBem = valorBem;
    }

    public String getCpfCandidato() {
        return cpfCandidato;
    }

    public void setCpfCandidato(String cpfCandidato) {
        this.cpfCandidato = cpfCandidato;
    }

    public String getNomeCandidato() {
        return nomeCandidato;
    }

    public void setNomeCandidato(String nomeCandidato) {
        this.nomeCandidato = nomeCandidato;
    }
    
    
    
}
