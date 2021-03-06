/* campos
DATA_GERACAO;HORA_GERACAO;ANO_ELEICAO;DESCRICAO_ELEICAO;SIGLA_UF;SQ_CANDIDATO;CD_TIPO_BEM_CANDIDATO;DS_TIPO_BEM_CANDIDATO;DETALHE_BEM;VALOR_BEM;DATA_ULTIMA_ATUALIZACAO;HORA_ULTIMA_ATUALIZACAO;
*/
create table if not exists BEM_CANDIDATO(
	DATA_GERACAO varchar(50),
	HORA_GERACAO varchar(50),
	ANO_ELEICAO varchar(50),
	DESCRICAO_ELEICAO varchar(200),
	SIGLA_UF varchar(50),
	SQ_CANDIDATO varchar(50),
	CD_TIPO_BEM_CANDIDATO varchar(200),
	DS_TIPO_BEM_CANDIDATO varchar(200),
	DETALHE_BEM varchar(200),
	VALOR_BEM float,
	DATA_ULTIMA_ATUALIZACAO varchar(50),
	HORA_ULTIMA_ATUALIZACAO varchar(50)
);
