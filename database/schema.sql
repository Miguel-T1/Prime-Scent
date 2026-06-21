CREATE DATABASE IF NOT EXISTS prime_scent;

USE prime_scent;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  gender VARCHAR(50) NOT NULL,
  volume VARCHAR(50) NOT NULL,
  fragrance_family VARCHAR(100) NOT NULL,
  weight DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products
(name, brand, price, category, gender, volume, fragrance_family, weight, description, image)
VALUES
-- JEAN PAUL GAULTIER — MASCULINOS
('Le Male Eau de Toilette', 'Jean Paul Gaultier', 529.90, 'masculino', 'masculino', '125ml', 'aromático fougère', 0.45, 'Perfume masculino clássico da Jean Paul Gaultier, com perfil aromático, fresco e marcante.', 'https://via.placeholder.com/300x300?text=Le+Male+EDT'),

('Le Male Le Parfum', 'Jean Paul Gaultier', 699.90, 'masculino', 'masculino', '125ml', 'oriental amadeirado', 0.45, 'Versão intensa da linha Le Male, com perfil elegante, quente e sofisticado.', 'https://via.placeholder.com/300x300?text=Le+Male+Le+Parfum'),

('Le Male Elixir', 'Jean Paul Gaultier', 749.90, 'masculino', 'masculino', '125ml', 'amadeirado ambarado', 0.45, 'Fragrância masculina intensa, doce e ambarada, com presença marcante.', 'https://via.placeholder.com/300x300?text=Le+Male+Elixir'),

('Ultra Male', 'Jean Paul Gaultier', 649.90, 'masculino', 'masculino', '125ml', 'oriental doce', 0.45, 'Perfume masculino adocicado, intenso e moderno, conhecido por sua projeção.', 'https://via.placeholder.com/300x300?text=Ultra+Male'),

('Le Beau Eau de Toilette', 'Jean Paul Gaultier', 599.90, 'masculino', 'masculino', '125ml', 'amadeirado aromático', 0.45, 'Perfume masculino fresco e sensual, com proposta tropical e elegante.', 'https://via.placeholder.com/300x300?text=Le+Beau+EDT'),

('Le Beau Le Parfum', 'Jean Paul Gaultier', 699.90, 'masculino', 'masculino', '125ml', 'amadeirado âmbar', 0.45, 'Versão mais intensa e sofisticada da linha Le Beau.', 'https://via.placeholder.com/300x300?text=Le+Beau+Le+Parfum'),

('Scandal Pour Homme Eau de Toilette', 'Jean Paul Gaultier', 589.90, 'masculino', 'masculino', '100ml', 'amadeirado oriental', 0.42, 'Perfume masculino moderno, doce e marcante, com identidade noturna.', 'https://via.placeholder.com/300x300?text=Scandal+Pour+Homme'),

('Scandal Pour Homme Le Parfum', 'Jean Paul Gaultier', 699.90, 'masculino', 'masculino', '100ml', 'oriental intenso', 0.42, 'Versão mais intensa da linha Scandal masculina, com perfil sedutor e potente.', 'https://via.placeholder.com/300x300?text=Scandal+Le+Parfum'),

-- JEAN PAUL GAULTIER — FEMININOS
('Classique Eau de Toilette', 'Jean Paul Gaultier', 529.90, 'feminino', 'feminino', '100ml', 'floral oriental', 0.40, 'Fragrância feminina clássica da Jean Paul Gaultier, elegante e sensual.', 'https://via.placeholder.com/300x300?text=Classique+EDT'),

('Classique Eau de Parfum', 'Jean Paul Gaultier', 629.90, 'feminino', 'feminino', '100ml', 'floral oriental', 0.40, 'Versão Eau de Parfum da linha Classique, mais intensa e envolvente.', 'https://via.placeholder.com/300x300?text=Classique+EDP'),

('La Belle Eau de Parfum', 'Jean Paul Gaultier', 649.90, 'feminino', 'feminino', '100ml', 'oriental gourmand', 0.40, 'Perfume feminino doce, sensual e sofisticado da linha La Belle.', 'https://via.placeholder.com/300x300?text=La+Belle+EDP'),

('La Belle Le Parfum', 'Jean Paul Gaultier', 729.90, 'feminino', 'feminino', '100ml', 'oriental gourmand intenso', 0.40, 'Versão mais intensa da linha La Belle, com perfil doce e marcante.', 'https://via.placeholder.com/300x300?text=La+Belle+Le+Parfum'),

('Scandal Eau de Parfum', 'Jean Paul Gaultier', 599.90, 'feminino', 'feminino', '80ml', 'chipre floral', 0.38, 'Perfume feminino marcante, doce e elegante, com forte identidade da linha Scandal.', 'https://via.placeholder.com/300x300?text=Scandal+EDP'),

('Scandal Le Parfum', 'Jean Paul Gaultier', 699.90, 'feminino', 'feminino', '80ml', 'floral oriental intenso', 0.38, 'Versão mais intensa e sofisticada da linha Scandal feminina.', 'https://via.placeholder.com/300x300?text=Scandal+Le+Parfum'),

('So Scandal!', 'Jean Paul Gaultier', 649.90, 'feminino', 'feminino', '80ml', 'floral branco', 0.38, 'Fragrância feminina floral, cremosa e ousada, com proposta moderna.', 'https://via.placeholder.com/300x300?text=So+Scandal'),

('Gaultier Divine Eau de Parfum', 'Jean Paul Gaultier', 699.90, 'feminino', 'feminino', '100ml', 'floral âmbar', 0.40, 'Perfume feminino luminoso, floral e sofisticado da Jean Paul Gaultier.', 'https://via.placeholder.com/300x300?text=Gaultier+Divine'),

-- DIOR — MASCULINOS
('Sauvage Eau de Toilette', 'Dior', 649.90, 'masculino', 'masculino', '100ml', 'fresco cítrico amadeirado', 0.45, 'Perfume masculino fresco, cítrico e amadeirado da linha Sauvage.', 'https://via.placeholder.com/300x300?text=Sauvage+EDT'),

('Sauvage Eau de Parfum', 'Dior', 749.90, 'masculino', 'masculino', '100ml', 'cítrico ambarado', 0.45, 'Versão Eau de Parfum da linha Sauvage, com perfil mais intenso e envolvente.', 'https://via.placeholder.com/300x300?text=Sauvage+EDP'),

('Sauvage Parfum', 'Dior', 849.90, 'masculino', 'masculino', '100ml', 'cítrico amadeirado intenso', 0.45, 'Versão Parfum da linha Sauvage, mais concentrada e sofisticada.', 'https://via.placeholder.com/300x300?text=Sauvage+Parfum'),

('Sauvage Elixir', 'Dior', 999.90, 'masculino', 'masculino', '60ml', 'especiado fresco amadeirado', 0.35, 'Fragrância masculina de alta intensidade da linha Sauvage.', 'https://via.placeholder.com/300x300?text=Sauvage+Elixir'),

('Sauvage Eau Forte', 'Dior', 799.90, 'masculino', 'masculino', '100ml', 'fresco intenso', 0.45, 'Fragrância masculina da linha Sauvage com proposta fresca e intensa.', 'https://via.placeholder.com/300x300?text=Sauvage+Eau+Forte'),

('Dior Homme Eau de Toilette', 'Dior', 699.90, 'masculino', 'masculino', '100ml', 'amadeirado almiscarado', 0.45, 'Perfume masculino elegante e moderno da linha Dior Homme.', 'https://via.placeholder.com/300x300?text=Dior+Homme+EDT'),

('Dior Homme Intense', 'Dior', 849.90, 'masculino', 'masculino', '100ml', 'amadeirado floral almiscarado', 0.45, 'Versão intensa da linha Dior Homme, com perfil sofisticado e marcante.', 'https://via.placeholder.com/300x300?text=Dior+Homme+Intense'),

('Dior Homme Parfum', 'Dior', 999.90, 'masculino', 'masculino', '100ml', 'couro amadeirado', 0.45, 'Versão Parfum da linha Dior Homme, com proposta luxuosa e intensa.', 'https://via.placeholder.com/300x300?text=Dior+Homme+Parfum'),

('Fahrenheit Eau de Toilette', 'Dior', 649.90, 'masculino', 'masculino', '100ml', 'couro aromático', 0.45, 'Perfume masculino clássico da Dior, conhecido por seu perfil marcante e elegante.', 'https://via.placeholder.com/300x300?text=Fahrenheit+EDT'),

('Fahrenheit Le Parfum', 'Dior', 849.90, 'masculino', 'masculino', '75ml', 'oriental especiado', 0.38, 'Versão mais intensa e quente da linha Fahrenheit.', 'https://via.placeholder.com/300x300?text=Fahrenheit+Le+Parfum'),

('Eau Sauvage Eau de Toilette', 'Dior', 599.90, 'masculino', 'masculino', '100ml', 'cítrico aromático', 0.45, 'Fragrância masculina clássica da Dior, fresca e refinada.', 'https://via.placeholder.com/300x300?text=Eau+Sauvage'),

-- DIOR — FEMININOS
('Miss Dior Eau de Parfum', 'Dior', 749.90, 'feminino', 'feminino', '100ml', 'floral', 0.40, 'Perfume feminino floral, elegante e romântico da linha Miss Dior.', 'https://via.placeholder.com/300x300?text=Miss+Dior+EDP'),

('Miss Dior Parfum', 'Dior', 899.90, 'feminino', 'feminino', '80ml', 'floral intenso', 0.38, 'Versão mais intensa e sofisticada da linha Miss Dior.', 'https://via.placeholder.com/300x300?text=Miss+Dior+Parfum'),

('Miss Dior Blooming Bouquet', 'Dior', 699.90, 'feminino', 'feminino', '100ml', 'floral fresco', 0.40, 'Fragrância feminina delicada e fresca da linha Miss Dior.', 'https://via.placeholder.com/300x300?text=Blooming+Bouquet'),

('J adore Eau de Parfum', 'Dior', 799.90, 'feminino', 'feminino', '100ml', 'floral solar', 0.40, 'Perfume feminino icônico da Dior, com perfil floral luminoso e sofisticado.', 'https://via.placeholder.com/300x300?text=Jadore+EDP'),

('L Or de J adore', 'Dior', 999.90, 'feminino', 'feminino', '80ml', 'floral intenso', 0.38, 'Versão luxuosa e intensa da linha J adore.', 'https://via.placeholder.com/300x300?text=LOr+de+Jadore'),

('J adore Parfum d Eau', 'Dior', 849.90, 'feminino', 'feminino', '100ml', 'floral fresco', 0.40, 'Fragrância feminina floral da linha J adore com proposta moderna e luminosa.', 'https://via.placeholder.com/300x300?text=Jadore+Parfum+dEau'),

('Dior Addict Eau de Parfum', 'Dior', 799.90, 'feminino', 'feminino', '100ml', 'oriental floral', 0.40, 'Perfume feminino intenso, elegante e sensual da linha Dior Addict.', 'https://via.placeholder.com/300x300?text=Dior+Addict'),

('Hypnotic Poison Eau de Toilette', 'Dior', 699.90, 'feminino', 'feminino', '100ml', 'oriental baunilhado', 0.40, 'Fragrância feminina marcante e envolvente da linha Poison.', 'https://via.placeholder.com/300x300?text=Hypnotic+Poison'),

('Poison Girl Eau de Parfum', 'Dior', 749.90, 'feminino', 'feminino', '100ml', 'oriental gourmand', 0.40, 'Perfume feminino doce, ousado e sedutor da linha Poison Girl.', 'https://via.placeholder.com/300x300?text=Poison+Girl'),

('Pure Poison Eau de Parfum', 'Dior', 749.90, 'feminino', 'feminino', '100ml', 'floral branco', 0.40, 'Perfume feminino floral, limpo e sofisticado da linha Poison.', 'https://via.placeholder.com/300x300?text=Pure+Poison'),

-- ARMANI — MASCULINOS
('Acqua di Gio Eau de Toilette', 'Giorgio Armani', 599.90, 'masculino', 'masculino', '100ml', 'aquático aromático', 0.45, 'Perfume masculino clássico da Armani, fresco, aquático e versátil.', 'https://via.placeholder.com/300x300?text=Acqua+di+Gio+EDT'),

('Acqua di Gio Eau de Parfum', 'Giorgio Armani', 699.90, 'masculino', 'masculino', '100ml', 'aromático aquático', 0.45, 'Versão Eau de Parfum da linha Acqua di Gio, com perfil fresco e luminoso.', 'https://via.placeholder.com/300x300?text=Acqua+di+Gio+EDP'),

('Acqua di Gio Parfum', 'Giorgio Armani', 799.90, 'masculino', 'masculino', '100ml', 'aquático amadeirado', 0.45, 'Versão Parfum da linha Acqua di Gio, mais intensa e sofisticada.', 'https://via.placeholder.com/300x300?text=Acqua+di+Gio+Parfum'),

('Acqua di Gio Profondo Eau de Parfum', 'Giorgio Armani', 749.90, 'masculino', 'masculino', '100ml', 'aquático aromático', 0.45, 'Perfume masculino fresco e profundo, inspirado no universo marinho.', 'https://via.placeholder.com/300x300?text=Acqua+di+Gio+Profondo'),

('Armani Code Eau de Toilette', 'Giorgio Armani', 599.90, 'masculino', 'masculino', '125ml', 'amadeirado âmbar', 0.45, 'Perfume masculino elegante e sedutor da linha Armani Code.', 'https://via.placeholder.com/300x300?text=Armani+Code+EDT'),

('Armani Code Eau de Parfum', 'Giorgio Armani', 699.90, 'masculino', 'masculino', '125ml', 'fougère âmbar', 0.45, 'Versão Eau de Parfum da linha Armani Code, com perfil mais intenso.', 'https://via.placeholder.com/300x300?text=Armani+Code+EDP'),

('Armani Code Parfum', 'Giorgio Armani', 799.90, 'masculino', 'masculino', '125ml', 'amadeirado aromático', 0.45, 'Versão Parfum da linha Armani Code, sofisticada e duradoura.', 'https://via.placeholder.com/300x300?text=Armani+Code+Parfum'),

('Armani Code Elixir', 'Giorgio Armani', 899.90, 'masculino', 'masculino', '50ml', 'amadeirado intenso', 0.35, 'Fragrância masculina intensa da linha Armani Code.', 'https://via.placeholder.com/300x300?text=Armani+Code+Elixir'),

('Stronger With You Eau de Toilette', 'Giorgio Armani', 579.90, 'masculino', 'masculino', '100ml', 'fougère amadeirado', 0.45, 'Perfume masculino moderno, quente e envolvente da linha Stronger With You.', 'https://via.placeholder.com/300x300?text=Stronger+With+You+EDT'),

('Stronger With You Intensely', 'Giorgio Armani', 699.90, 'masculino', 'masculino', '100ml', 'âmbar amadeirado especiado', 0.45, 'Versão intensa da linha Stronger With You, com perfil quente, doce e marcante.', 'https://via.placeholder.com/300x300?text=SWY+Intensely'),

('Stronger With You Absolutely', 'Giorgio Armani', 749.90, 'masculino', 'masculino', '100ml', 'amadeirado quente', 0.45, 'Fragrância masculina intensa com perfil quente, amadeirado e sofisticado.', 'https://via.placeholder.com/300x300?text=SWY+Absolutely'),

('Stronger With You Parfum', 'Giorgio Armani', 799.90, 'masculino', 'masculino', '100ml', 'oriental fougère', 0.45, 'Versão Parfum da linha Stronger With You, com proposta moderna, poderosa e elegante.', 'https://via.placeholder.com/300x300?text=SWY+Parfum');