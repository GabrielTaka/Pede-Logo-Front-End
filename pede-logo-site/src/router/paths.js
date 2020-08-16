/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/',
    // Relative to /src/views
    view: 'Login'
  },
  {
    path: '/admin/dashboard',
    // Relative to /src/views
    view: 'Dashboard'
  },
  {
    path: '/admin/products',
    name: 'Lista de Produtos',
    view: 'ProductsList'
  },
  {
    path: '/admin/products/new',
    name: 'Lista de Produtos',
    view: 'ProductsNew'
  },
  {
    path: '/admin/products/:id',
    name: 'edit_product',
    view: 'ProductsNew',
    props: true
  },
  {
    path: '/admin/establishments',
    name: 'Estabelecimento',
    view: 'EstablishmentsList'
  },
  {
    path: '/admin/establishments/new',
    name: 'Estabelecimento',
    view: 'EstablishmentsNew'
  },
  {
    path: '/admin/establishments/:id/edit',
    name: 'Estabelecimento',
    view: 'EstablishmentsNew',
    props: true
  },
  {
    path: '/admin/users',
    name: 'Profissionais',
    view: 'UsersList'
  },
  {
    path: '/admin/users/new',
    name: 'Profissionais',
    view: 'UsersNew'
  },
  {
    path: '/admin/users/:id/edit',
    name: 'Profissional',
    view: 'UsersNew',
    props: true
  },
  {
    path: '/admin/tables',
    name: 'Tables List',
    view: 'tables/List'
  },
  {
    path: '/admin/tables/new',
    name: 'Tables New',
    view: 'tables/Table'
  },
  {
    path: '/admin/schedulings',
    name: 'Schedulings',
    view: 'Scheduling'
  }

]
