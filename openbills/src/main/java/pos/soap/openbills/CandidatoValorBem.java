/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pos.soap.openbills;

import java.io.Serializable;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SqlResultSetMapping;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
/**
 *
 * @author vmvini
 * Classe que representa em quantos reais um candidato declarou em bens em determinado ano
 */
/*@SqlResultSetMapping(
        name = "CandidatoValorBemMapping",
        classes = @ConstructorResult(
                targetClass = CandidatoValorBem.class,
                columns = {
                    @ColumnResult(name = "anoEleicao", type = String.class),
                    @ColumnResult(name = "cpfCandidato"),
                    @ColumnResult(name = "nomeCandidato"),
                    @ColumnResult(name = "valorBem", type = double.class )}))*/

//@XmlRootElement()
//@XmlAccessorType (XmlAccessType.FIELD)
public class CandidatoValorBem {

    private String anoEleicao;

    private double valorBem;

    private String cpfCandidato;

    private String nomeCandidato;

    public CandidatoValorBem(String anoEleicao, String cpfCandidato, String nomeCandidato, Double valorBem ) {
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

    @Override
    public String toString() {
        return "CandidatoValorBem{" + "anoEleicao=" + anoEleicao + ", valorBem=" + valorBem + ", cpfCandidato=" + cpfCandidato + ", nomeCandidato=" + nomeCandidato + '}';
    }




}
