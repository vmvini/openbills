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


create table if not exists CONSULTA_CAND(
	DATA_GERACAO varchar(200),
	HORA_GERACAO varchar(200),
	ANO_ELEICAO varchar(200),
	NUM_TURNO varchar(200),
	DESCRICAO_ELEICAO varchar(200),
	SIGLA_UF varchar(200),
	SIGLA_UE varchar(200),
	DESCRICAO_UE varchar(200),
	CODIGO_CARGO varchar(200),
	DESCRICAO_CARGO varchar(200),
	NOME_CANDIDATO varchar(200),
	SEQUENCIAL_CANDIDATO varchar(200),
	NUMERO_CANDIDATO varchar(200),
	CPF_CANDIDATO varchar(200),
	NOME_URNA_CANDIDATO varchar(200),
	COD_SITUACAO_CANDIDATURA int,
	DES_SITUACAO_CANDIDATURA varchar(200),
	NUMERO_PARTIDO int,
	SIGLA_PARTIDO varchar(200),
	NOME_PARTIDO varchar(200),
	CODIGO_LEGENDA varchar(200),
	SIGLA_LEGENDA varchar(200),
	COMPOSICAO_LEGENDA varchar(200),
	NOME_LEGENDA varchar(200),
	CODIGO_OCUPACAO varchar(200),
	DESCRICAO_OCUPACAO varchar(200),
	DATA_NASCIMENTO varchar(200),
	NUM_TITULO_ELEITORAL_CANDIDATO varchar(200),
	IDADE_DATA_ELEICAO varchar(200),
	CODIGO_SEXO varchar(200),
	DESCRICAO_SEXO varchar(200),
	COD_GRAU_INSTRUCAO int,
	DESCRICAO_GRAU_INSTRUCAO varchar(200),
	CODIGO_ESTADO_CIVIL varchar(200),
	DESCRICAO_ESTADO_CIVIL varchar(200),
	CODIGO_NACIONALIDADE varchar(200),
	DESCRICAO_NACIONALIDADE varchar(200),
	SIGLA_UF_NASCIMENTO varchar(200),
	CODIGO_MUNICIPIO_NASCIMENTO varchar(200),
	NOME_MUNICIPIO_NASCIMENTO varchar(200),
	DESPESA_MAX_CAMPANHA float,
	COD_SIT_TOT_TURNO int,
	DESC_SIT_TOT_TURNO varchar(200)
);










/*********************************************DESPESAS**********************************************/









/*2002*/
create table  if not exists DESPESA_CAND_2002(
	SEQUENCIAL_CANDIDATO varchar(200),
	SG_UF varchar(200),
	SG_PART varchar(200),
	DS_CARGO varchar(200),
	NO_CAND varchar(200),
	NR_CAND varchar(200),
	DT_DOC_DESP varchar(200),
	CD_CPF_CGC varchar(200),
	SG_UF_FORNECEDOR varchar(200),
	NO_FOR varchar(200),
	VR_DESPESA varchar(200),
	DS_TITULO varchar(200)

);

/*2004*/
create table  if not exists DESPESA_CAND_2004(
	NO_CAND varchar(200),
	DS_CARGO varchar(200),
	CD_CARGO varchar(200),
	NR_CAND varchar(200),
	SG_UE_SUP varchar(200),
	NO_UE varchar(200),
	SG_UE varchar(200),
	NR_PART varchar(200),
	SG_PART varchar(200),
	VR_DESPESA varchar(200),
	DT_DOC_DESP varchar(200),
	DS_TITULO varchar(200),
	CD_TITULO varchar(200),
	TP_RECURSO varchar(200),
	DS_TP_RECURSO varchar(200),
	NR_DOC_DESP varchar(200),
	DS_TIPO_DOCUMENTO text,
	CD_DOC varchar(200),
	NO_FOR varchar(200),
	CD_CPF_CGC varchar(200),
	DS_MUNIC varchar(200),
	RV_MEANING varchar(200)
);


/*2006*/
create table  if not exists DESPESA_CAND_2006(
	SEQUENCIAL_CANDIDATO varchar(200),
	NOME_CANDIDATO varchar(200),
	DESCRICAO_CARGO varchar(200),
	CODIGO_CARGO varchar(200),
	NUMERO_CANDIDATO varchar(200),
	UNIDADE_ELEITORAL_CANDIDATO varchar(200),
	NUMERO_CNPJ_CANDIDATO varchar(200),
	NUMERO_PARTIDO varchar(200),
	SIGLA_PARTIDO varchar(200),
	VALOR_DESPESA varchar(200),
	DATA_DESPESA varchar(200),
	TIPO_DESPESA varchar(200),
	CODIGO_TIPO_DESPESA varchar(200),
	DESCRICAO_FORMA_PAGAMENTO varchar(200),
	CODIGO_FORMA_PAGAMENTO varchar(200),
	NUMERO_DOCUMENTO varchar(200),
	TIPO_DOCUMENTO text,
	CODIGO_TIPO_DOCUMENTO varchar(200),
	NOME_FORNECEDOR varchar(200),
	NUMERO_CPF_CGC_FORNECEDOR varchar(200),
	UNIDADE_ELEITORAL_FORNECEDOR varchar(200),
	SITUACAO_CADASTRAL varchar(200)
);

/*2008*/
create table  if not exists DESPESA_CAND_2008(
	SEQUENCIAL_CANDIDATO varchar(200),
	NO_CAND varchar(200),
	DS_CARGO varchar(200),
	CD_CARGO varchar(200),
	NR_CAND varchar(200),
	SG_UE_SUPERIOR varchar(200),
	NM_UE varchar(200),
	SG_UE varchar(200),
	NR_CNPJ varchar(200),
	NR_PARTIDO varchar(200),
	SG_PART varchar(200),
	VR_DESPESA varchar(200),
	DT_DESPESA varchar(200),
	DS_TITULO varchar(200),
	CD_TITULO varchar(200),
	DS_ESP_RECURSO varchar(200),
	CD_ESP_RECURSO varchar(200),
	DS_NR_DOCUMENTO varchar(200),
	DS_TIPO_DOCUMENTO text,
	CD_TIPO_DOCUMENTO varchar(200),
	NM_FORNECEDOR varchar(200),
	CD_CPF_CNPJ_FORNECEDOR varchar(200),
	SG_UE_SUPERIOR1 varchar(200),
	NM_UE1 varchar(200),
	SG_UE1 varchar(200),
	NO_UE varchar(200),
	SITUACAOCADASTRAL varchar(200),
	NM_ADM varchar(200),
	NR_CPF varchar(200)

);

/*2010*/

create table if not exists DESPESA_CAND_2010(
	DATA_HORA varchar(200),
	SEQUENCIAL_CANDIDATO varchar(200),
	UF varchar(200),
	SG_PART varchar(200),
	NR_CAND varchar(200),
	DS_CARGO varchar(200),
	NO_CAND varchar(200),
	CPF varchar(200),
	ENTREGA_CONJUNTO varchar(200),
	TIPO_DOCUMENTO text,
	NUMERO_DOCUMENTO varchar(200),
	CD_CPF_CNPJ_FORNECEDOR varchar(200),
	NM_FORNECEDOR varchar(200),
	DATA_DESPESA varchar(200),
	VALOR_DESPESA varchar(200),
	TIPO_DESPESA varchar(200),
	FONTE_RECURSO varchar(200),
	ESPECIE_RECURSO varchar(200),
	DS_DESPESA text

);
















/***********************************RECEITAS****************************************************/



















/*2002 */
create table  if not exists RECEITA_CAND_2002(
	SEQUENCIAL_CANDIDATO int, 
	SG_UF varchar(2),
	SG_PART varchar(10),
	DS_CARGO varchar(20),
	NO_CAND varchar(200),
	NR_CAND varchar(10),
	DT_RECEITA date,
	CD_CPF_CGC varchar(20),
	SG_UF_DOADOR varchar(2),
	NO_DOADOR varchar(200),
	VR_RECEITA float,
	TP_RECURSO varchar(20)

);

/*2004 */
create table  if not exists RECEITA_CAND_2004(
	NO_CAND varchar(200),
	DS_CARGO varchar(200),
	CD_CARGO varchar(200),
	NR_CAND varchar(200),
	SG_UE_SUP varchar(200),
	NO_UE varchar(200),
	SG_UE varchar(200),
	NR_PART varchar(200),
	SG_PART varchar(200),
	VR_RECEITA varchar(200),
	DT_RECEITA varchar(200),
	DS_TITULO varchar(200),
	CD_TITULO varchar(200),
	TP_RECURSO varchar(200),
	TP_COD_RECURSO varchar(200),
	NO_DOADOR varchar(200),
	CD_CPF_CGC_DOA varchar(200),
	RV_MEANING varchar(200)
);


/*2006*/
create table  if not exists RECEITA_CAND_2006(
	SEQUENCIAL_CANDIDATO varchar(200),
	NOME_CANDIDATO varchar(200),
	DESCRICAO_CARGO varchar(200),
	CODIGO_CARGO varchar(200),
	NUMERO_CANDIDATO varchar(200),
	UNIDADE_ELEITORAL_CANDIDATO varchar(200),
	NUMERO_CNPJ_CANDIDATO varchar(200),
	NUMERO_PARTIDO varchar(200),
	SIGLA_PARTIDO varchar(200),
	VALOR_RECEITA varchar(200),
	DATA_RECEITA varchar(200),
	TIPO_RECEITA varchar(200),
	CODIGO_TIPO_RECEITA varchar(200),
	DESCRICAO_TIPO_RECURSO varchar(200),
	CODIGO_TIPO_RECURSO varchar(200),
	NOME_DOADOR varchar(200),
	NUMERO_CPF_CGC_DOADOR varchar(200),
	UNIDADE_ELEITORAL_DOADOR varchar(200),
	SITUACAO_CADASTRAL varchar(200)
);


/*2008*/ 
create table  if not exists RECEITA_CAND_2008(
	SEQUENCIAL_CANDIDATO varchar(200),
	NM_CANDIDATO varchar(200),
	SEXO varchar(200),
	DS_CARGO varchar(200),
	CD_CARGO varchar(200),
	NR_CANDIDATO varchar(200),
	SG_UE_SUPERIOR varchar(200),
	NM_UE varchar(200),
	SG_UE varchar(200),
	DS_NR_TITULO_ELEITOR varchar(200),
	CD_NUM_CPF varchar(200),
	CD_NUM_CNPJ varchar(200),
	NR_PARTIDO varchar(200),
	SG_PARTIDO varchar(200),
	VR_RECEITA varchar(200),
	DT_RECEITA varchar(200),
	DS_TITULO varchar(200),
	CD_TITULO varchar(200),
	DS_ESP_RECURSO varchar(200),
	CD_ESP_RECURSO varchar(200),
	NM_DOADOR varchar(200),
	CD_CPF_CNPJ_DOADOR varchar(200),
	SG_UE_SUPERIOR1 varchar(200),
	NM_UE1 varchar(200),
	SG_UE1 varchar(200),
	SITUACAOCADASTRAL varchar(200),
	NM_ADM varchar(200),
	CD_CPF_ADM varchar(200)

);


/*2010*/
create table if not exists RECEITA_CAND_2010(
	DATA_HORA varchar(200),
	SEQUENCIAL_CANDIDATO varchar(200),
	SG_UF varchar(200),
	SG_PARTIDO varchar(200),
	NUMERO_CANDIDATO varchar(200),
	DESCRICAO_CARGO varchar(200),
	NOME_CANDIDATO varchar(200),
	CD_NUM_CPF varchar(200),
	ENTREGA_EM_CONJUNTO varchar(200),
	RECIBO_ELEITORAL varchar(200),
	NUMERO_DOCUMENTO varchar(200),
	CD_CPF_CNPJ_DOADOR varchar(200),
	NM_DOADOR varchar(200),
	DATA_RECEITA varchar(200),
	VR_RECEITA varchar(200),
	TP_RECURSO varchar(200),
	FONTE_RECURSO varchar(200),
	DS_ESP_RECURSO text,
	DS_RECEITA text
);

















/***************************VIEWS**************************************/
/**VIEW UNIAO DOADORES**/
CREATE OR REPLACE VIEW uniaoDoadores AS SELECT * FROM ( (SELECT t.CPF candCPF, t.CD_CPF_CNPJ_FORNECEDOR cpf, t.NM_FORNECEDOR nome FROM DESPESA_CAND_2010 t WHERE t.CD_CPF_CNPJ_FORNECEDOR != t.CPF) UNION (SELECT t.CD_NUM_CPF candCPF, t.CD_CPF_CNPJ_DOADOR cpf, t.NM_DOADOR nome FROM RECEITA_CAND_2010 t WHERE t.CD_CPF_CNPJ_DOADOR != t.CD_NUM_CPF) ) d;

/**VIEW PARA DOADORES DISTINTOS**/
CREATE OR REPLACE VIEW distinctDoadores AS SELECT * FROM (select * from ( select *, row_number() over (partition by cpf order by nome) as row_number from uniaoDoadores ) as rows where row_number = 1) dd;

/**VIEW PARA POLITICOS DISTINTOS**/
CREATE OR REPLACE VIEW distinctPoliticos AS SELECT cpf_candidato, nome_candidato, data_nascimento, descricao_sexo, descricao_grau_instrucao, descricao_estado_civil, descricao_nacionalidade, sigla_uf_nascimento, nome_municipio_nascimento  FROM (select * from ( select *, row_number() over (partition by cpf_candidato order by nome_candidato) as row_number from CONSULTA_CAND ) as rows where row_number = 1) dp;

/**VIEW PARA RECUPERAR DOADORES JUNTO COM SEUS FINANCIADOS (JSON)**/
CREATE OR REPLACE VIEW doadoresJson AS ( select row_to_json(dd) as doadores from( select doador.cpf, doador.nome,  (select json_agg(fn) from ( select j.candCPF, j.nome_candidato, j.cpf_candidato, j.data_nascimento, j.descricao_grau_instrucao, j.descricao_estado_civil, j.descricao_nacionalidade, j.sigla_uf_nascimento, j.nome_municipio_nascimento from (select * from uniaoDoadores dsd, distinctPoliticos c where dsd.cpf = doador.cpf and dsd.candCPF = c.cpf_candidato ) j   ) fn ) as dps from distinctDoadores as doador) dd );

/**VIEW PARA RECUPERAR POLITICOS DISTINTOS(JSON)**/
CREATE  OR REPLACE VIEW politicosJson AS ( SELECT row_to_json(politico) FROM ( SELECT * FROM distinctPoliticos ) politico );


