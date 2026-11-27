-- Banco de dados do projeto "Consulta de Produtos"
-- Para executar: mysql -u root -p < script.sql
-- (ou abra este arquivo no MySQL Workbench / importe no phpMyAdmin)
-- ATENÇÃO: o script apaga e recria a tabela "produtos", então rodar de novo
-- volta ao estado inicial (só os 5 produtos de exemplo).

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS consulta_produtos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE consulta_produtos;

DROP TABLE IF EXISTS produtos;

CREATE TABLE produtos (
  id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nome       VARCHAR(100)  NOT NULL,
  categoria  VARCHAR(80)   NOT NULL,
  preco      DECIMAL(10,2) NOT NULL,
  quantidade INT UNSIGNED  NOT NULL DEFAULT 0,
  descricao  VARCHAR(1000) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO produtos (nome, categoria, preco, quantidade, descricao) VALUES
('Mouse Gamer RGB', 'Periféricos', 129.90, 25, 'Mouse óptico com 6 botões programáveis e iluminação RGB.'),
('Teclado Mecânico', 'Periféricos', 289.90, 12, 'Teclado mecânico ABNT2 com switches azuis e retroiluminação.'),
('Monitor Full HD 24 polegadas', 'Monitores', 749.00, 8, 'Monitor LED de 24 polegadas, 75 Hz, com entrada HDMI.'),
('Headset com Microfone', 'Áudio', 159.90, 18, 'Headset com almofadas macias e microfone com cancelamento de ruído.'),
('Webcam Full HD', 'Acessórios', 199.90, 15, 'Webcam 1080p com microfone embutido e clipe para monitor.');
