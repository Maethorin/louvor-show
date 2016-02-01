insert INTO musicas (nome, cantor_id, sequencia)
    values (
      'Celebrai a Cristo, Celebrai', 3, '1, 1, 1, 3, 4, 4, 2, 2'
    );

insert INTO estrofes (musica_id, indice) values (1, 1);
insert INTO estrofes (musica_id, indice) values (1, 2);
insert INTO estrofes (musica_id, indice) values (1, 3);
insert INTO estrofes (musica_id, indice) values (1, 4);

insert into versos (estrofe_id, cifra, letra, ordem)
    values (
        1, '', 'Instrumental:', 1
    );
insert into versos (estrofe_id, cifra, letra, ordem)
    values (
        1, '<b>F</b>  <b>Bb9</b>  <b>C</b>  <b>F</b>  <b>Bb9</b>  <b>C</b>', '', 2
    );

insert into versos (estrofe_id, cifra, letra, ordem)
    values (
        2, '<b>F</b>     <b>Bb9</b>     <b>C</b>      <b>F</b>        <b>Bb9</b>  <b>C</b>', 'Celebrai a Cristo, Celebrai', 1
    );
insert into versos (estrofe_id, cifra, letra, ordem)
    values (
        2, '<b>F</b>     <b>Bb9</b>     <b>C</b>      <b>F</b>        <b>Bb9</b>  <b>C</b>', 'Celebrai a Cristo, Celebrai', 2
    );
insert into versos (estrofe_id, cifra, letra, ordem)
    values (
        2, '<b>F</b>     <b>Bb9</b>     <b>C</b>      <b>F</b>        <b>Bb9</b>  <b>C</b>', 'Celebrai a Cristo, Celebrai', 3
    );
insert into versos (estrofe_id, cifra, letra, ordem)
    values (
        2, '<b>F</b>     <b>Bb9</b>     <b>C</b>      <b>F</b>', 'Celebrai a Cristo, Celebrai', 4
    );

insert into versos (estrofe_id, cifra, letra, ordem)
    values (
        3, '<b>C</b>            <b>Dm</b>', 'Ressuscitou, Ressuscitou...', 1
    );
insert into versos (estrofe_id, cifra, letra, ordem)
    values (
        3, '       <b>C</b>           <b>Dm</b>', 'E hoje vive, para sempre', 2
    );
insert into versos (estrofe_id, cifra, letra, ordem)
    values (
        3, '<b>C</b>            <b>Dm</b>', 'Ressuscitou, Ressuscitou...', 3
    );
insert into versos (estrofe_id, cifra, letra, ordem)
    values (
        3, '       <b>C</b>           <b>Dm</b>', 'E hoje vive, para sempre', 4
    );

insert into versos (estrofe_id, cifra, letra, ordem)
    values (
        4, '<b>C</b>                <b>Bb9</b>', 'Vamos celebrar, hei hei', 1
    );
insert into versos (estrofe_id, cifra, letra, ordem)
    values (
        4, '<b>C</b>                <b>Bb9</b>', 'Vamos Celebrar, oooohhh', 2
    );
insert into versos (estrofe_id, cifra, letra, ordem)
    values (
        4, '<b>C</b>                     <b>Bb9</b>   <b>C</b>  <b>F</b>', 'Vamos Celebrar, ressuscitou o Senhor.', 3
    );
