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

