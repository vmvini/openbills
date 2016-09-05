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