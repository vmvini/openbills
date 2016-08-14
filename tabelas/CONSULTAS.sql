/*consultas

POLITICOS COM MUITOS BENS:
ALUÍZIO BEZERRA DE OLIVEIRA  00340243104
			2006        | 10329                |      0
 			2008        | 560                  | 382900


exibir os candidatos cujo valor de bem vem aumentando a cada ano que passa

*/


#BENS X TEMPO

#consulta para listar valor de bem em relação ao ano COM DETALHE DO BEM:
;select distinct b.ANO_ELEICAO, c.NOME_CANDIDATO, c.SEQUENCIAL_CANDIDATO, b.VALOR_BEM, b.DETALHE_BEM from BEM_CANDIDATO b, CONSULTA_CAND c WHERE c.CPF_CANDIDATO = '00340243104' AND c.SEQUENCIAL_CANDIDATO = b.SQ_CANDIDATO order by b.ANO_ELEICAO asc ;

#consulta para listar valor de bem em relação ao ano SOMANDO BENS:
;select distinct b.ANO_ELEICAO, c.SEQUENCIAL_CANDIDATO, sum (b.VALOR_BEM) from BEM_CANDIDATO b, CONSULTA_CAND c WHERE c.CPF_CANDIDATO = '000619772496' AND c.SEQUENCIAL_CANDIDATO = b.SQ_CANDIDATO group by b.ANO_ELEICAO, c.SEQUENCIAL_CANDIDATO order by b.ANO_ELEICAO asc ;
