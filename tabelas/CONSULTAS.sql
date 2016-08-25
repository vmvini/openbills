/*consultas

POLITICOS COM MUITOS BENS:
ALUÍZIO BEZERRA DE OLIVEIRA  00340243104
			2006        | 10329                |      0
 			2008        | 560                  | 382900


exibir os candidatos cujo valor de bem vem aumentando a cada ano que passa

*/


#BENS X TEMPO

#consulta para listar valor de bem em relação ao ano COM DETALHE DO BEM:
;select distinct b.ANO_ELEICAO, c.NOME_CANDIDATO, c.SEQUENCIAL_CANDIDATO, b.VALOR_BEM, b.DETALHE_BEM from BEM_CANDIDATO b, CONSULTA_CAND c WHERE c.CPF_CANDIDATO = '13814443268' AND c.SEQUENCIAL_CANDIDATO = b.SQ_CANDIDATO order by b.ANO_ELEICAO asc ;

#consulta para listar valor de bem em relação ao ano SOMANDO BENS:
;select distinct b.ANO_ELEICAO,  sum (b.VALOR_BEM) from BEM_CANDIDATO b, CONSULTA_CAND c WHERE c.CPF_CANDIDATO = '16986644272' AND c.SEQUENCIAL_CANDIDATO = b.SQ_CANDIDATO group by b.ANO_ELEICAO order by b.ANO_ELEICAO asc ;



#CANDIDATOS ELEITOS - RETORNAR TODOS OS CANDIDATOS ELEITOS N VEZES

#exibir quantas as vezes em q um candidato foi eleito
;select c.DATA_GERACAO, c.SEQUENCIAL_CANDIDATO, c.ANO_ELEICAO, c.NOME_CANDIDATO, c.CPF_CANDIDATO from CONSULTA_CAND c where c.DESC_SIT_TOT_TURNO = 'ELEITO'  and c.CPF_CANDIDATO = '16986644272';

#exibir pessoas eleitas N vezes
;select c.NOME_CANDIDATO, c.CPF_CANDIDATO, count(*)  from CONSULTA_CAND c where c.DESC_SIT_TOT_TURNO = 'ELEITO' group by c.NOME_CANDIDATO, c.CPF_CANDIDATO having count(*) >= 2;
