/*2004 */
create table receita_candidato(

	SEQUENCIAL_CANDIDATO serial,
	NOME_CANDIDATO varchar(200),
	DESCRICAO_CARGO varchar(20),
	CODIGO_CARGO int,
	NUMERO_CANDIDATO int,
	UNIDADE_ELEITORAL_CANDIDATO varchar(2),
	NOME_MUNICIPIO varchar(50),
	CODIGO_MUNICIPIO int,
	NUMERO_PARTIDO int, 
	SIGLA_PARTIDO varchar(10),
	VALOR_RECEITA float,
	DATA_RECEITA date,
	TIPO_RECEITA varchar(50),
	CODIGO_TIPO_RECEITA  varchar(20),
	DESCRICAO_TIPO_RECURSO varchar(20),
	CODIGO_TIPO_RECURSO int,
	NOME_DOADOR varchar(200),
	NUMERO_CPF_CGC_DOADOR  varchar(11),
	SITUACAO_CADASTRAL varchar(20),

	primary key (SEQUENCIAL_CANDIDATO)

);
	
/*2002 */
create table if not exists receita_candidato(
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
	TP_RECURSO varchar(20),
	id serial,
	primary key (id)

);