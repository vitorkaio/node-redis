# node-redis
Test redis with node js

## Objetivo

Essa aplicação tem como objetivo testar a integração do node js com o redis. Como teste será feito um acesso a api do github do usuário vitorkaio. Com os repositórios acessados, será feito um print do nome de cada um. A cada 10 repos que for lido o programa será finalizado e o último repo será salvo no redis para que quando o programa for executado novamente continue onde parou.